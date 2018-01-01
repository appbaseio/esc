# Searchbar

This article is a part of the series on [**how to build a search bar**](https://appbaseio.gitbooks.io/esc/content/searchbar/introduction.html).

## How to make a normal search bar

// Edit this line:

This chapter therefore provides a quick implementation details of normal search bar using Elasticsearch.

The main functionalities that we will need for doing this are:

1. **Auto complete** - While user types, we need to provide auto-completion for the input queries. Auto-complete functionality should be as fast as a user types to provide instant feedback relevant to what a user has already typed in.  Elasticsearch provides a convenient way to get autocomplete up and running quickly with its completion suggester feature.
2. **Suggestions**\(or full text search\) - Use quick suggestions to help users save time, iterate on their searches, and get the results they want. It helps to show the relevant data to user inputs.

`Note:` You can deep dive into the implementation details of the above two functionalities through these chapters - [Auto Completion](https://github.com/appbaseio/esc/blob/master/searchbar/auto-complete.md) and [Suggestions](https://github.com/appbaseio/esc/blob/master/searchbar/suggestions.md).

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

In this section, we will specify the mappings for our two fields: city and country, with the necessary settings to enable auto-complete and suggestion functionalities.

`auto-suggest` analyzer will be useful to get the suggestions. For the auto completion we will create a `case_insensitive` analyzer that tokenizes the text as is \(i.e. no white space splitting\) and applies a lowercase filter.

```json
curl -XPUT $host/normal_searchbar/_settings?pretty -d '{
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
      },
      "case_insensitive": {
        "tokenizer": "keyword",
        "filter": [
          "lowercase"
        ]
      }
    }
  }  
}'
```

We just added a custom analyzers. The `_settings` endpoint can be used for adding one or more custom analyzers.

## Defining Mappings

Here we will use two fields and two subfields each of these fields. These subfields are useful to store the same data in a different manner. `city` field is useful to index the cities with the default analyzer of Elasticsearch.

`city_autocomplete` subfield is useful for the auto completion feature. It index the data using `case_insensitive` analyzer and with type **completion**.

`city_autocomplete` subfield is useful for the auto suggestion feature. It index the data using `auto-suggest` analyzer and with type **string**.

```json
curl -XPUT $host/normal_searchbar/_mapping/searchbar -d '{
  "searchbar": {
    "properties": {
      "city": {
        "type": "string",
        "fields": {
          "city_autocomplete": {
            "type": "completion",
            "analyzer": "case_insensitive",
            "search_analyzer": "case_insensitive"
          },
          "city_autosuggest": {
            "type": "string",
            "analyzer": "auto-suggest",
            "search_analyzer": "case_insensitive"
          }
        }
      },
      "country": {
        "type": "string",
        "fields": {
          "country_autocomplete": {
            "type": "completion",
            "analyzer": "case_insensitive",
            "search_analyzer": "case_insensitive"
          },
          "country_autosuggest": {
            "type": "string",
            "analyzer": "auto-suggest",
            "search_analyzer": "case_insensitive"
          }
        }
      }
    }
  }
}'
```

### Data Indexing

As you can see, while indexing the data, we only need to insert the city and country fields.

```json
curl -XPUT $host/normal_searchbar/searchbar/1 -d '{
  "city": "New York",
  "country": "United States"
}'
```

### Data Browser View

For accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/rHOEixS.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALGAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsf75RGH_jHaI0iFldVUA8qAu_IuFdCiPbQoJXhucJFD7Tx0dCbrMnss3gpLkoGLSlzMWr0Rs78QzD1cInlCxvWqSgdLhvpBcAJW68g0Vhcn0xKzkLHaOzsy68EPdXOYucCl6c8hMMRGu3y4dlzbBXn60r5lbWVcwldsd4kUXc8NRk6kGMuYbn4Qx47XYODZCQPz6_vsDAwA).

### Query

Next, we will move to the queries section. Here, we will be using the match query for getting the suggestions and will be using the **completion** suggestor query for getting the autocomplete suggestions. Let's first query on the `city` field.

```json
curl "$host/normal_searchbar/searchbar/_search?pretty" -d '{
  "query": {
    "match": {
      "city.city_autosuggest": "New"
    }
  },
  "suggest": {
    "city-suggest": {
      "text": "New",
      "completion": {
        "field": "city.city_autocomplete"
      }
    }
  }             
}'
```

##### Response

```json
{
  "took" : 18,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 2.6197505,
    "hits" : [ {
      "_index" : "normal_searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYRgYhvsk2FETcMug",
      "_score" : 2.6197505,
      "_source" : {
        "city" : "New York",
        "country" : "United States"
      }
    }, {
      "_index" : "normal_searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYTTkhvsk2FETcNLo",
      "_score" : 2.6197505,
      "_source" : {
        "city" : "New Farm",
        "country" : "Australia"
      }
    }]
  },
  "suggest" : {
    "city-suggest" : [ {
      "text" : "New",
      "offset" : 0,
      "length" : 3,
      "options" : [ {
        "text" : "Newport",
        "score" : 5.0
      }, {
        "text" : "Newmarket",
        "score" : 2.0
      } ]
    } ]
  }
}
```

#### Query on both City and Country

```json
curl "$host/normal_searchbar/searchbar/_search?pretty" -d '{
  "query": {
     "multi_match": {
        "query": "New",
        "fields": ["city.city_autosuggest", "country.country_autosuggest"]
    }
  },
  "suggest": {
    "city-suggest": {
      "text": "New",
      "completion": {
        "field": "city.city_autocomplete"
      }
    },
    "country-suggest": {
      "text": "New",
      "completion": {
        "field": "country.country_autocomplete"
      }
    }
  }       
}'
```

### Query Response

```json
{
  "took" : 15,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 1.7185925,
    "hits" : [ {
      "_index" : "normal_searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYRgYhvsk2FETcMug",
      "_score" : 1.7185925,
      "_source" : {
        "city" : "New York",
        "country" : "United States"
      }
    }, {
      "_index" : "normal_searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYTTkhvsk2FETcNLo",
      "_score" : 1.7185925,
      "_source" : {
        "city" : "New Farm",
        "country" : "Australia"
      }
    } ]
  },
  "suggest" : {
    "country-suggest" : [ {
      "text" : "New",
      "offset" : 0,
      "length" : 3,
      "options" : [ ]
    } ],
    "city-suggest" : [ {
      "text" : "New",
      "offset" : 0,
      "length" : 3,
      "options" : [ {
        "text" : "Newport",
        "score" : 5.0
      }, {
        "text" : "Newmarket",
        "score" : 2.0
      } ]
    } ]
  }
}
```



