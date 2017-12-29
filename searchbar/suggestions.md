# As-You-Type Suggestions

This article is a part of the series on [**how to build a search bar**](https://appbaseio.gitbooks.io/esc/content/searchbar/introduction.html).

### How to build an as-you-type suggestions view

In this post, we will implement a search-as-you-type suggestions feature to help users save time, iterate on their searches, and get the results they want. It can also help with showing the relevant data to user’s inputs. We will be using a dataset containing a list of cities and countries and we will be building this feature using a custom n-gram analyzer.

To implement this functionality, we will use an edge-ngram tokenizer with a custom type analyzer. A custom analyzer allows to combine character filters, tokenizer, and token filters all at once. In this case we have used a self defined `tokenizer` called `ngramizer` which will split on characters that don’t belong to the classes specified in `token_chars` field.

`Note:` An alternate approach can be implemented using Elasticsearch's **completion** type and queried using a  **suggester** type query. You can read more about it in our building a search-as-you-type auto-completion feature post [here](https://github.com/appbaseio/esc/blob/master/searchbar/auto-complete.md).

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

In this section, we will specify the mappings for our two fields: city and country, with the necessary settings to enable suggestions functionality.

### Transforming data to n-gram tokens before indexing

We would ideally want the auto-suggestion to work on a text phrase in a way that even if the user types a word that is not at the start of the phrase, we can match it correctly. This is where n-grams come in handy. A 3-gram for the word "York" will be \["yor", "ork", "rky", "kyo"\].

We will set our tokenizer to create all \[1-10\] grams of a token. You can read more about ngrams over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-edgengram-tokenizer.html).

```json
curl -XPUT "$host/searchbar/_settings?pretty" -d '{
  "settings": {
    "analysis": {
      "tokenizer": {
        "ngramizer": {
          "type": "edge_ngram",
          "min_gram": 1,
          "max_gram": 10,
          "token_chars": [
            "letter",
            "digit",
            "punctuation",
            "symbol"
          ]
        }
      },
      "analyzer": {
        "auto-suggest": {
          "type": "custom",
          "tokenizer": "ngramizer",
          "filter": [
            "lowercase",
            "asciifolding"
          ]
        }
      }
    }
  }
}'
```

We just added a custom analyzer called `auto-suggest` which uses a custom tokenizer `ngramizer` for creating \[1-10\]grams for each token.

`Note:` The `_settings` endpoint can be used for adding one more custom analyzers.

### Updating Mappings

Next, we will update the mapping for the **city** and **country** fields. We will exploit a very cool feature of Elasticsearch called [**multi-fields**](https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html) in doing so. Multi-fields enable indexing the same field in different ways, thus allowing for multiple ways of querying without requiring any additional effort in indexing of the data.

```json
curl -XPUT "$host/searchbar/_mapping/searchbar" -d '{
  "properties": {
    "city": {
      "type": "string",
      "fields": {
        "city_autosuggest": {
          "type": "string",
          "analyzer": "auto-suggest",
          "search_analyzer": "standard"
        }
      }
    },
    "country": {
      "type": "string",
      "fields": {
        "country_autosuggest": {
          "type": "string",
          "analyzer": "auto-suggest",
          "search_analyzer": "standard"
        }
      }
    }
  }
}'
```

Note that we are only analyzing the data into n-grams at index time. At search time, creating n-grams from the search text would be redundant and hence, we will use a **standard** analyzer over there.

### Data Indexing

As you can see, while indexing the data, we only need to insert the **city** and **country** fields.

```json
curl -XPUT $host/searchbar/searchbar/1 -d '{
  "city": "New York",
  "country": "United States"
}'
```

## Data Browser View

For better accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/rHOEixS.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAAI-AQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsf75RGH_jHaI0iFldVUA8qAu_IuFdCiPbQoJXhucJFD7Tx0dCbrMnss3gpLkoGLSlzMWr0Rs78QzD1cInlCxvWqSgdLhvpBcAJW68g0Vhcn0xKzkLHaOzsy68EPdXOYucCl6c8hMMRGu3y4dlzbBXn60r5lbWVcwldsd4kUXc8NRk6kGMuYbn4Qx47XYTdu7ltXvSb6rTmSxttA5ZONh8TQH1ljQwh7A7pkH2Onet5Fm384jza2JoDwBKVQOFn0TqOzVjhWlMQ5L1D_WGJgdWWmK3RWUWnBpnTqQ_hu-SA)

### Query

Next, we will move to the queries section. Here, we will be using the match query for getting the suggestions. Let's first query on `city` field.

```json
curl "$host/searchbar/searchbar/_search?pretty" -d '{
  "query": {
    "match": {
      "city.city_autosuggest": "York"
    }                                                        
  }
}'
```

Here user inputs are passed as a value of `city.city_autosuggest` field.

##### Response

```json
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 4.4288692,
    "hits" : [ {
      "_index" : "searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYWRohvsk2FETcOKG",
      "_score" : 4.4288692,
      "_source" : {
        "city" : "York",
        "country" : "United Kingdom"
      }
    }, {
      "_index" : "searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYRgYhvsk2FETcMug",
      "_score" : 3.321652,
      "_source" : {
        "city" : "New York",
        "country" : "United States"
      }
    }]
  }
}
```

In the response, you can see Elasticsearch has returned two documents which have matched with the `York` query. Match query also provides `_score` field to get the similarity ratio between user inputs and indexed documents.

#### Query on Country

A similar query for suggestions on the **country** field would look like this:

```json
curl "$host/searchbar/searchbar/_search?pretty" -d '{
  "query": {
    "match": {
      "country.country_autosuggest": "States"
    }
  }
}'
```

#### Query on both City and Country

```json
curl "$host/searchbar/searchbar/_search?pretty" -d '{
  "query": {
    "multi_match": {
      "query": "New York",
      "fields": ["city.city_autosuggest", "country.country_autosuggest"]
    }
  }
}'
```

### Query Response

```json
{
  "took" : 17,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 3.1685972,
    "hits" : [ {
      "_index" : "searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYRgYhvsk2FETcMug",
      "_score" : 3.1685972,
      "_source" : {
        "city" : "New York",
        "country" : "United States"
      }
    }, {
      "_index" : "searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYWRohvsk2FETcOKG",
      "_score" : 1.3023362,
      "_source" : {
        "city" : "York",
        "country" : "United Kingdom"
      }
    }]
  }
}
```

You can also try out this query interactively  [here. ![](https://i.imgur.com/nC3g4LR.png)](https://opensource.appbase.io/mirage/#?input_state=XQAAAAJzBgAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmHIOnFYWKnjL6-LioSaiwWbKm_OIbIe7ew9C3YQvvSfy-iE0mJ3iUHlS7SxqW4Kfd54TO7SG1hbWbzeo-WSJR46OsqZykOAMwSirRgXpSq5OMBdelMP92rD8WwuEem48-PmehVw-xj9TrrjLdB6QMZ24tgkCj4S8wY4NKZdxnxGJNXHDAiW8CYZ41X_QLVWCkTCtI9soPwJzqCRAE57BJ3eXhcn_e98cm9ym9LyFbfx47JbGMzG-tP4rUljRT-KX0718OJLlPpfWKCUEm56Tq8CYlXhOnaN56ZyIdxt1ZJt6hbyNpDC37TiuSHBdw5dUJ8p24QA8uuqOh0kxOaVXIOW5mnqVEvRJWxRnafT2663Um7XL8IiQhcKR_AKv1y-lYc4z-u95F8q94Pv5wP52njSb5Ay05gOZ1-KVHrTKulMUezxcGI8NmpVVDN_cepbY9ZOxRpTzGx4W8I7bBqCM3cO14yonnDaCPfWWF5BHfUZdM0haAjG2GQY9gA8yZnruuRt8ZAcLKBG8_qpUX2QBudrf3gYUeutnn6ghCxaWkJn5h2X67mWsftEOvcdUveMzeZCOEgrJVqgz8RzYTu-ct9Vp0Q81sN4JF2J-DlUptRT-FTOer9sjFPxfGezfZ7-QkNiof9u8F4Eyo8YZjMxf8HYO-7BFQjrBrtmkcUa__BRI0s)

Next, you should read about [**Searchbar**](https://appbaseio.gitbooks.io/esc/content/searchbar/searchbar.html).

