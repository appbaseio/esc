# Auto Completion

This article is a part of the series on [**how to build a search bar**](https://appbaseio.gitbooks.io/esc/content/searchbar/introduction.html).

### How to build a search-as-you-type autocompletion view

In this post, we will show how to provide an auto-completion of the inputs **as the user types** in a searchbar. We will be using a dataset containing a list of cities and countries and we will be building this feature using Elasticsearch's **completion** type `field`.

`Note:` Alternate approaches can be implemented using n-grams and prefix suggester algorithms. But speed is the most important aspect for this feature. We're making suggestions while the user types, so results need to be shown to the user within milliseconds. When using the completion type, Elasticsearch indexes data into a trie like data structure \(called FST\) which is optimized for fast retrieval and memory usage.

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

In this section, we will specify the mappings for our two fields: city and country, with the necessary settings to enable auto-complete functionality.

### Updating Mappings

Next, we will update the mapping for the **city** and **country** fields. We will exploit a very cool feature of Elasticsearch called [**multi-fields**](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/multi-fields.html) in doing so. Multi-fields enable indexing the same field in different ways, thus allowing for multiple ways of querying without requiring any additional effort in indexing of the data.

```json
curl -XPUT $host/normal_searchbar/_mapping/searchbar -d '{
  "properties": {
    "city": {
      "type": "text",
      "fields": {
        "city_autocomplete": {
          "type": "completion",
          "analyzer": "simple",
          "search_analyzer": "simple"
        }
      }
    },
    "country": {
      "type": "text",
      "fields": {
        "country_autocomplete": {
          "type": "completion",
          "analyzer": "simple",
          "search_analyzer": "simple"
        }
      }
    }
  }
}'
```

Here, we have defined a multi-field for both `city` and `country` fields. The `city_autocomplete` field \(inner field\) has a type **completion** while the `city` field \(outer field\) has a type **text** and both are indexed simultaneously. We also use the `simple` analyzer that tokenizes the text as is \(i.e. no white space splitting\) and applies a lowercase filter for both indexing and searching on the \*\_autocomplete inner fields.

## Data Indexing

As you can see, while indexing the data, we only need to insert the **city** and **country** fields.

```json
curl -XPUT $host/normal_searchbar/searchbar/1 -d '{
  "city": "New York",
  "country": "United States"
}'
```

## Data Browser View

For better accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/rHOEixS.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALvAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFslF8ZMg7A6kGLFGPADbJVmb5ysVqinQQuiFLkb4deUgCDkj3Ca7c1o_y8XA0-MkniaJtriPLcO0sOs-he9RgZSsY1-Dj7M1oUHcSMXEdlL__k05smSCpzBnTIbIxXMyoFoHyy8Z_g-Ku8eQnTdtXdsrQgMg_wmz9OmY-26TdzjLWp-v2Wf1WiRDeMXYvBl1QvLH_j_iLGk7AkFU5rmsqyCR3BmLVt2baZT9KRDsA_8PvEAA&editable=false)

## Query

Next, we will move to the queries section. Here, we will be using the **completion** suggestor query for getting the autocomplete suggestions. You can read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-completion.html).

```json
curl "$host/normal_searchbar/searchbar/_search?size=0&pretty" -d '{
  "suggest": {
    "city-suggest": {
      "text": "new y",
      "completion": {
        "field": "city.city_autocomplete"
      }
    }
  }
}'
```

Here, `text` is the actual text that the user has typed so far and `completion` contains the field in which Elasticsearch will look for completion suggestions.

##### Response

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
      "text" : "new y",
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

Voila! We can see "New York" as the suggestion which we can now display in the search box.

#### Query on Country

A similar query for suggestions on the **country** field would look like this:

```json
curl "$host/normal_searchbar/searchbar/_search?size=0&pretty" -d '{
  "suggest": {
    "country-suggest": {
      "text": "united st",
      "completion": {
        "field": "country.country_autocomplete"
      }
    }
  }
}'
```

#### Query on both City and Country

What if we wanted to provide autocompletion on both **city** and **country** fields at the same time?

```json
curl "$host/normal_searchbar/searchbar/_search?size=0&pretty" -d '{
  "suggest": {
    "city-suggest": {
      "text": "Chi",
      "completion": {
        "field": "city.city_autocomplete"
      }
    },
    "country-suggest": {
      "text": "Chi",
      "completion": {
        "field": "country.country_autocomplete"
      }
    }
  }
}'
```

##### Response

```json
{
  "took" : 49,
  "timed_out" : false,
  "_shards" : {
    "total" : 2,
    "successful" : 2,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 0,
    "max_score" : 0.0,
    "hits" : [ ]
  },
  "suggest" : {
    "city-suggest" : [
      {
        "text" : "Chi",
        "offset" : 0,
        "length" : 3,
        "options" : [
          {
            "text" : "Chiajna",
            "_index" : "normal_searchbar",
            "_type" : "searchbar",
            "_id" : "AWDMLdpE5Q83Zq9GY7SX",
            "_score" : 1.0,
            "_source" : {
              "city" : "Chiajna",
              "country" : "Romania"
            }
          }
        ]
      }
    ],
    "country-suggest" : [
      {
        "text" : "Chi",
        "offset" : 0,
        "length" : 3,
        "options" : [
          {
            "text" : "Chile",
            "_index" : "normal_searchbar",
            "_type" : "searchbar",
            "_id" : "AWDMLep65Q83Zq9GY7hi",
            "_score" : 1.0,
            "_source" : {
              "city" : "ViÃÂÃÂ±a del Mar",
              "country" : "Chile"
            }
          }
        ]
      }
    ]
  }
}
```

We can then pick the item with the highest score value: "China" in this case, and display it in the searchbox's input section.

We can also use the suggest query for building a search as-you-type suggestions feature by arranging the other items in a dropdown list. However, doing so has some limitations.

1. We can't detect suggestions on a full-text phrase if the user starts typing from the middle of the phrase or even the middle of the word.
2. Prior to v5 of Elasticsearch, we couldn't show additional fields of the document as a part of the suggestion UI \(like images\) since the **completion suggest** query only returns the field in question.

---

Next, we talk about building a [**search as-you-type suggestions**](https://appbaseio.gitbooks.io/esc/content/searchbar/suggestions.html) feature using n-grams.
