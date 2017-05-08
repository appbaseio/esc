# Auto Completion

This article is a part of the series on [**how to build a search bar**](https://appbaseio.gitbooks.io/esc/content/searchbar/introduction.html).

### How to build a search-as-you-type autocompletion view

In this post, we will show how to provide an auto-completion of the inputs **as the user types** in a searchbar. We will be using a dataset containing a list of cities and countries and we will be building this feature using Elasticsearch's **completion** type `field`.

`Note:` Alternate approaches can be implemented using n-grams and prefix suggester algorithms. But speed is the most important aspect for this feature. We're making suggestions while the user types, so results need to be shown to the user within milliseconds. When using the completion type, Elasticsearch indexes data into a trie like data structure (called FST) which is optimized for fast retrieval and memory usage.

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

In this section, we will specify the mappings for our two fields: city and country, with the necessary settings to enable auto-complete functionality.

### Transforming data to lower case before indexing

We would ideally want the autocompletion feature to work in a case agnostic fashion and at the granularity of phrases, i.e. typing a partial phrase should bring up the rest of the phrase in the autocompletion. To do this, we will create a **case_insensitive** analyzer that tokenizes the text as is (i.e. no white space splitting) and applies a lowercase filter. You can read more about analyzers over [here](https://www.elastic.co/blog/found-text-analysis-part-1).

```json
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

Next, we will update the mapping for the **city** and **country** fields. We will exploit a very cool feature of Elasticsearch called [**multi-fields**](https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html) in doing so. Multi-fields enable indexing the same field in different ways, thus allowing for multiple ways of querying without requiring any additional effort in indexing of the data.

```json
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

Here, we have defined a multi-field for both `city` and `country` fields. The `city_autocomplete` field (inner field) has a type **completion** while the `city` field (outer field) has a type **string** and both are indexed simultaneously. We have also used our custom analyzer for both indexing and searching on the \*\_autocomplete inner fields.


## Data Indexing

As you can see, while indexing the data, we only need to insert the **city** and **country** fields.

```json
curl -XPUT $host/searchbar/searchbar/1 -d '{
  "city": "New York",
  "country": "United States"
}'
```

## Data Browser View

For better accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/rHOEixS.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAAJAAQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsf75RGH_jHaI0iFldVUA8qAu_IuFdCiPbQoJXhucJFD7Tx0dCbrMnss3gpLkoGLSlzMWr0Rs78QzD1cInlCxvWqSgdLhvpBcAJW68g0Vhcn0xKzkLHaOzsy68EPdXOYucCl6c8hMMQXZU8RP8JPvBLWiIf_G_5CaVPuXWMq80wmLUMeKsvdkOKaDd_W7WG8h79UJXsBc9NLaRYY6oShMAY_3HGtH02SLYlH-N0ExeTsT43zTkU7dYN_iKMait_nJZcZyMo7hS57cbGA-YH7xF6hwJdNQpyaY-_RrAA)

## Query

Next, we will move to the queries section. Here, we will be using the **completion** suggestor query for getting the autocomplete suggestions. You can read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-completion.html).

```json
curl "$host/searchbar/searchbar/_search?size=0&pretty" -d '{
  "suggest": {
    "city-suggest": {
      "text": "New Y",
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

Voila! We can see "New York" as the suggestion which we can now display in the search box.

#### Query on Country

A similar query for suggestions on the **country** field would look like this:

```json
curl "$host/searchbar/searchbar/_search?size=0&pretty" -d '{
  "suggest": {
    "country-suggest": {
      "text": "New",
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
curl "$host/searchbar/searchbar/_search?size=0&pretty" -d '{
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
  "took" : 23,
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
    "country-suggest" : [ {
      "text" : "Chi",
      "offset" : 0,
      "length" : 3,
      "options" : [ {
        "text" : "China",
        "score" : 401.0
      }, {
        "text" : "Chile",
        "score" : 127.0
      } ]
    } ],
    "city-suggest" : [ {
      "text" : "Chi",
      "offset" : 0,
      "length" : 3,
      "options" : [ {
        "text" : "Chita",
        "score" : 2.0
      }, {
        "text" : "Chihuahua",
        "score" : 2.0
      } ]
    } ]
  }
}
```

We can then pick the item with the highest score value: "China" in this case, and display it in the searchbox's input section.

We can also use the suggest query for building a search as-you-type suggestions feature by arranging the other items in a dropdown list. However, doing so has some limitations.

1. We can't detect suggestions on a full-text phrase if the user starts typing from the middle of the phrase.
2. We can't show additional fields of the document as a part of the suggestion UI (like images) since the **completion suggest** query only returns the field in question.

---

Next, we talk about building a [**search as-you-type suggestions**](https://appbaseio.gitbooks.io/esc/content/searchbar/suggestions.html) feature using n-grams.
