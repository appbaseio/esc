# Suggestions (Full Text Search)

This article is a part of the series on [**how to build a search bar**](https://github.com/appbaseio/esc/blob/master/searchbar/introduction.md).

### How to build a search-as-you-type suggestions view.

This example implements an instant-search based auto-suggestion feature which provides quick suggestions to help users save time, iterate on their searches, and get the results they want. It can also helps to show the relevant data to user’s inputs.

To implement this functionality we will use edge-ngram tokenizer with the custom type analyzer. Custom analyzer allows to combine a appropriate character filters, tokenizer, and token filters. In this case we have used self defined `tokenizer` called ngramizer which will split on characters that don’t belong to the classes specified in `token_chars` field.

Let's understand it with the example. Suppose user typed `New York` city. At first tokenizer will split the word by space, because space class does not belong to `token_chars`. Then it will generate all the possible edge-ngrams of length between 1 to 10. Elasticsearch provides `min_gram`and `max_gram` fields to put a cap on length. This iteration will store `New York` as `[N, Ne, New, Y, Yo, Yor, York]`. Then it will pass through the filters. Which will turn the entire input into lowercase.  

Edge-ngrams algoritham divides words into the chunks of small words from the starting point. 

`Note:` Read more about edge-ngrams over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-edgengram-tokenizer.html). 

**TODO** explain why we used standard analyzer for the search_index.

### Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

In this section, we will specify the mappings for our two fields: city and country, with the necessary settings to enable auto-complete functionality.


```bash
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
We just added a custom analyzer. The `_settings` endpoint can be used for adding one more custom analyzers.

### Updating Mappings

Next, we will update the mapping for the **city** and **country** fields. We will exploit a very cool feature of Elaticsearch called [**multi-fields**](https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html) in doing so. Multi-fields enable indexing the same field in different ways, thus allowing for multiple ways of querying without requiring any additional effort in indexing of the data.

```bash
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

### Data Indexing

As you can see, while indexing the data, we only need to insert the **city** and **country** fields.

```json
curl -XPUT "$host/searchbar/searchbar/new_york" -d '{
    "city": "New York"
}'
```

## Data Browser View

For better accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/rHOEixS.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALGAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsf75RGH_jHaI0iFldVUA8qAu_IuFdCiPbQoJXhucJFD7Tx0dCbrMnss3gpLkoGLSlzMWr0Rs78QzD1cInlCxvWqSgdLhvpBcAJW68g0Vhcn0xKzkLHaOzsy68EPdXOYucCl6c8hMMRGu3y4dlzbBXn60r5lbWVcwldsd4kUXc8NRk6kGMuYbn4Qx47XYODZCQPz6_vsDAwA).

### Query

```bash
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
    "total" : 42,
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
Elasticsearch also provides `_score` of each of the matched documents. 

Next, you should read about [**Searchbar**](https://github.com/appbaseio/esc/blob/master/searchbar/searchbar.md).
