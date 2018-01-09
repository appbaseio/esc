# As-You-Type Suggestions

This article is a part of the series on [**how to build a search bar**](https://appbaseio.gitbooks.io/esc/content/searchbar/introduction.html).

### How to build an as-you-type suggestions view

In this post, we will implement a search-as-you-type suggestions feature to help users save time, iterate on their searches, and get the results they want. It can also help with showing the relevant data to user’s inputs. We will be using a dataset containing a list of cities and countries and we will be building this feature using a custom n-gram analyzer.

To implement this functionality, we will use a n-gram tokenizer with a custom type analyzer. A custom analyzer allows to combine character filters, tokenizer, and token filters all at once. In this case we have used a self defined `tokenizer` called `ngramizer` which will split on characters that don’t belong to the classes specified in `token_chars` field.

`Note:` An alternate approach can be implemented using Elasticsearch's **completion** type and queried using a  **suggester** type query. You can read more about it in our building a search-as-you-type auto-completion feature post [here](https://github.com/appbaseio/esc/blob/master/searchbar/auto-complete.md).

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

In this section, we will specify the mappings for our two fields: city and country, with the necessary settings to enable suggestions functionality.

### Transforming data to n-gram tokens before indexing

We would ideally want the auto-suggestion to work on a text phrase in a way that even if the user types a word that is not at the start of the phrase, we can match it correctly. This is where n-grams come in handy. 3-grams for the phrase "New York" will be \["new", "yor", "ork", "rky", "kyo"\].

We will set our tokenizer to create all \[1-10\] grams of a token. You can read more about ngrams over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenizer.html).

```json
curl -XPUT "$host/normal_searchbar/_settings?pretty" -d '{
  "analysis": {
    "tokenizer": {
      "ngramizer": {
        "type": "ngram",
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
}'
```

We just added a custom analyzer called `auto-suggest` which uses a custom tokenizer `ngramizer` for creating \[1-10\]grams for each token.

`Note:` Where we use type as `ngram` in the above snippet, you can also instead set type as `edge_ngram`. It is like n-gram except filtered by the beginning character of the n-gram. \[1-3\] edge-grams for the phrase "New York" will be \["n", "ne", "new", "y", "yo", "yor"\].

`Note:` The `_settings` endpoint can be used for adding one or more custom analyzers.

### Updating Mappings

Next, we will update the mapping for the **city** and **country** fields. We will exploit a very cool feature of Elasticsearch called [**multi-fields**](https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html) in doing so. Multi-fields enable indexing the same field in different ways, thus allowing for multiple ways of querying without requiring any additional effort in indexing of the data.

```json
curl -XPUT "$host/normal_searchbar/_mapping/searchbar" -d '{
  "properties": {
    "city": {
      "type": "text",
      "fields": {
        "city_autosuggest": {
          "type": "text",
          "analyzer": "auto-suggest",
          "search_analyzer": "simple"
        }
      }
    },
    "country": {
      "type": "text",
      "fields": {
        "country_autosuggest": {
          "type": "text",
          "analyzer": "auto-suggest",
          "search_analyzer": "simple"
        }
      }
    }
  }
}'
```

Note that we are only analyzing the data into n-grams at index time. At search time, creating n-grams from the search text would be redundant and hence, we will use a **simple** analyzer over there. A [simple analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/analysis-simple-analyzer.html) only applies a lowercase tokenizer.

### Data Indexing

As you can see, while indexing the data, we only need to insert the **city** and **country** fields.

```json
curl -XPUT $host/normal_searchbar/searchbar/1 -d '{
  "city": "New York",
  "country": "United States"
}'
```

## Data Browser View

For better accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/rHOEixS.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALvAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFslF8ZMg7A6kGLFGPADbJVmb5ysVqinQQuiFLkb4deUgCDkj3Ca7c1o_y8XA0-MkniaJtriPLcO0sOs-he9RgZSsY1-Dj7M1oUHcSMXEdlL__k05smSCpzBnTIbIxXMyoFoHyy8Z_g-Ku8eQnTdtXdsrQgMg_wmz9OmY-26TdzjLWp-v2Wf1WiRDeMXYvBl1QvLH_j_iLGk7AkFU5rmsqyCR3BmLVt2baZT9KRDsA_8PvEAA&editable=false)

### Query

Next, we will move to the queries section. Here, we will be using the match query for getting the suggestions. Let's first query on `city` field.

```json
curl $host/normal_searchbar/searchbar/_search?pretty -d '{
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
      "_index" : "normal_searchbar",
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
curl $host/normal_searchbar/searchbar/_search?pretty -d '{
  "query": {
    "match": {
      "country.country_autosuggest": "States"
    }
  }
}'
```

#### Query on both City and Country

```json
curl $host/normal_searchbar/searchbar/_search?pretty -d '{
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
      "_index" : "normal_searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYRgYhvsk2FETcMug",
      "_score" : 3.1685972,
      "_source" : {
        "city" : "New York",
        "country" : "United States"
      }
    }, {
      "_index" : "normal_searchbar",
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

You can also try out this query interactively [here. ![](https://i.imgur.com/nC3g4LR.png)](https://opensource.appbase.io/mirage/#?input_state=XQAAAAISBgAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmIMRwpW8tLJEeyKCwoHzPOkL9M0KdbHLZtMVPxIPMlh7YYAQinNjBTPX006UGzGERYNqNYjacxklVFkEoKyx2zaubRUqhqxScMG9gD-h7bDyj7ZQ6VU2Kj2rkJ1mds7BRVYkDfAHTEbtNa5GW20cp1fus1prbJbNXISvUEQNnPsDOsiH93N8mrqk4ZUuFt9U-a6lycH_ep550RD_dqNp8O-_A9qC47n_yrU_BAyybWtYEqbqRubgwH5baTC-QUPkZhVv-NTguSpvY87WPm9DYiLbJIjGia60W7q-RJW_8qOldSdcuXZuaV-oe_SSrUY6SdSRnGUasF9jyyODzAvfMcKpMSaTmK2W9N2p9c-TjmKn0qNpP8rb_94BIPECIrPMS2bpz4FxVM4auqLxGt8ytJTGmaKWfXmxwlAKO5AZgEJNkz43JbjaPFoWka-u-2ZIYI3-aKmUOgeRoAQ9KuWN1P0Rx-Y3EoXZs3_Iodp48WS8L8kreylBybw8CiRF4K3xl8P0HMKBF0-Pk1p8N0mYLM6HEvjqseDb2elEtSWW8WrYoXyWb6AIIF9EkVvrCGbUYUeY6PcCg8O3Wv9vTP2h4sdg6o2CZb4kdrWmfDRACzWA1mdJXttyT4v-P24C9pE5NI7QALLlAkSPaURi91BbCgbH7yXgjG7_DYbag)

Benefits and Drawbacks v/s auto-complete.

1. Highlight the trade-off of increased index size because of space requirements of ngram.
2. Sometimes, you really don't want to match incomplete words, auto-complete is better in such a scenario.

---

Next, you should read about [**Searchbar**](https://appbaseio.gitbooks.io/esc/content/searchbar/searchbar.html).
