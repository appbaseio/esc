# Auto completion

This article is a part of the series on [**how to build a search bar**](https://github.com/appbaseio/esc/blob/master/searchbar/introduction.md).

### How to add a search-as-you-type autocompletion view.

This tutorial will walk through how to display results **as you type** in a searchbar. We’ll be building this feature with Elasticsearch's prefix match based completion type field. 

It can also be possible through n-grams and prefix suggester algorithms. But speed is the most important aspect for this feature. We're making suggestions while the user types, so results need to be shown to the user within a few milliseconds, considering the network latency into account.

## Defining Mappings

We will use own defined `case_insensitive` analyzer to make it case insensitive and to store the words without spliting it by spaces. Default(Type: Standard) analyzer of elasticsearch split the words by spaces. In our case we need space to filter out `New York` and `Newport` like documents.
**Read more about analyzer over [here](https://www.elastic.co/blog/found-text-analysis-part-1).**

Completion field of elasticsearch generates in-memory data structure called an FST to store and fetch the data. Understand the concepts of `completion` field through this [blog-post](in-memory data structure called an FST ).  


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
Define custom analyzer using `_settings` endpoint of elasticsearch. 

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
    }
  }
}'
```

## Data Indexing

```bash
curl -XPUT $host/searchbar/searchbar/new_york -d '{
    "city": "New York"
}'
```

## Data Browser View
For accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/rHOEixS.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALGAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsf75RGH_jHaI0iFldVUA8qAu_IuFdCiPbQoJXhucJFD7Tx0dCbrMnss3gpLkoGLSlzMWr0Rs78QzD1cInlCxvWqSgdLhvpBcAJW68g0Vhcn0xKzkLHaOzsy68EPdXOYucCl6c8hMMRGu3y4dlzbBXn60r5lbWVcwldsd4kUXc8NRk6kGMuYbn4Qx47XYODZCQPz6_vsDAwA).

## Query

```bash
curl "$host/searchbar/searchbar/_search?pretty" -d '{
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

### Query Response

```json
{
  "took" : 22,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "hits" : {
    "total" : 15506,
    "max_score" : 1.0,
    "hits" : [ {
      "_index" : "searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYRgYhvsk2FETcMtt",
      "_score" : 1.0,
      "_source" : {
        "city" : "Mukilteo",
        "country" : "United States"
      }
    }]
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

Next, you should read about [**Suggestions**](https://github.com/appbaseio/esc/blob/master/searchbar/suggestion.md).

