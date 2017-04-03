# Auto completion

This article is a part of the series on [**how to build a search bar**](https://github.com/appbaseio/esc/blob/master/searchbar/introduction.md).

### How to build a search-as-you-type autocompletion view

This tutorial will walk through how to provide completion of the inputs **as you type** in a searchbar on a dataset containing a list of cities and countries. We will be building this feature using Elasticsearch's **completion** type `field`. 

`Note:` Alternate approaches can be implemented using n-grams and prefix suggester algorithms. But speed is the most important aspect for this feature. We're making suggestions while the user types, so results need to be shown to the user within milliseconds. When using the completion type, Elasticsearch indexes data into a trie like data structure (called FST) which is optimized for fast retrieval and memory usage.

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

In this section, we will specify the mappings for our two fields: city and country, with the necessary settings to enable auto-complete functionality.

### Transforming data to lower case before indexing

We would ideally want the autocompletion feature to work in a case agnostic fashion and at the granularity of phrases, i.e. typing a partial phrase should bring up the rest of the phrase in the autocompletion. To do this, we will create a **case_insensitive** analyzer that tokenizes the text as is (i.e. no white space splitting) and applies a lowercase filter. You can read more about analyzers over [here](https://www.elastic.co/blog/found-text-analysis-part-1).

```bash
curl -XPUT $host/searchbar/_settings?pretty -d '{
  "analyzer": {
    "case_insensitive": {
      "tokenizer": "keyword",
      "filter": [
        "lowercase"
      ]             
    }   
  }
}'
```

We just added a custom analyzer. The `_settings` endpoint can be used for adding one more custom analyzers.

### Updating Mappings

Next, we will update the mapping for the **city** and **country** fields. We will exploit a very cool feature of Elaticsearch called [**multi-fields**](https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html) in doing so. Multi-fields enable indexing the same field in different ways, thus allowing for multiple ways of querying without requiring any additional effort in indexing of the data.

```bash
curl -XPUT $host/searchbar/_mapping/searchbar -d '{
  "properties": {
    "city": {
      "type": "string",
      "fields": {
        "city_autocomplete": {
          "type": "completion",
          "analyzer": "case_insensitive",
          "search_analyzer": "case_insensitive",
          "payloads": false
        }
      }
    },
    "country": {
      "type": "string",
      "fields": {
        "country_autocomplete": {
          "type": "completion",
          "analyzer": "case_insensitive",
          "search_analyzer": "case_insensitive",
          "payloads": false
        }
      }
    }
  }
}'
```

Here, we have defined a multi-field for both `city` and `country` fields. The `city_autocomplete` field (inner field) has a type **completion** while the `city` field (outer field) has a type **string** and both are indexed simultaneously. We have also used our custom analyzer for both indexing and searching on the \*_autocomplete inner fields.


## Data Indexing

As you can see, while indexing the data, we only need to insert the **city** and **country** fields.

```bash
curl -XPUT $host/searchbar/searchbar/1 -d '{
    "city": "New York",
    "country": "United States"
}'
```

## Data Browser View

For better accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/rHOEixS.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALGAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsf75RGH_jHaI0iFldVUA8qAu_IuFdCiPbQoJXhucJFD7Tx0dCbrMnss3gpLkoGLSlzMWr0Rs78QzD1cInlCxvWqSgdLhvpBcAJW68g0Vhcn0xKzkLHaOzsy68EPdXOYucCl6c8hMMRGu3y4dlzbBXn60r5lbWVcwldsd4kUXc8NRk6kGMuYbn4Qx47XYODZCQPz6_vsDAwA).

## Query

Next, we will move to the queries section. Here, we will be using the **completion** suggestor query for getting the autocomplete suggestions. You can read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-completion.html).

```bash
curl "$host/searchbar/searchbar/_search?size=0&pretty" -d '{
    "suggest": {
        "city-suggest" : {
            "text" : "New Y",
            "completion" : {
                "field" : "city.city_autocomplete"
            }
        }
    }
}'
```

Here, `text` is the actual text that the user has typed so far and `completion` contains the field in which Elasticsearch will look for completion suggestions.

### Query Response

```json
{
  "took" : 20,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "hits" : {
    "total" : 15506,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "suggest" : {
    "city-suggest" : [ {
      "text" : "New Y",
      "offset" : 0,
      "length" : 5,
      "options" : [ {
        "text" : "New York",
        "score" : 1.0
      } ]
    } ]
  }
}
```

This is it! You can also write a similar query for suggestions on **country** or one where suggestions can be made for both **city** and **country** fields at the same time.

TODO: Extend the query to provide suggestions on both **city** and **country** fields.

Next, you should read about [**Suggestions**](https://github.com/appbaseio/esc/blob/master/searchbar/suggestion.md).

