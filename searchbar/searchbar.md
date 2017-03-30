### How to make normal search bar?

This chapter therefore provides a simple introduction and guide to develop normal search bar of either your products, cities, names or anything that can be two-three words query.

The main functionality we need for the normal text searching are

1. **Auto complete** - While user typing we need to provide auto completion for the input queries. Auto-complete functionality should be as fast as a user types to provide instant feedback relevant to what a user has already typed in.  Elasticsearch provides a convenient way to get autocomplete up and running quickly with its completion suggester feature.
2. **Suggestions**(or full text search) - Use quick suggestions to help users save time, iterate on their searches, and get the results they want. It helps to show the relevant data to user’s inputs.

Elasticsearch can support to index the same field in different ways for different purposes. We will use the multi-fields provided by elasticsearch to store the data into three different fields. We need to make three sub fields related to three different functionalities.


**Note:** Read more about concepts of [multi-field](https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html).

**Note:** A short note on [analyzer](https://www.elastic.co/blog/found-text-analysis-part-1).

The field type for the autocomplete functionality must be completion. It can also be possible through n-grams and prefix suggester algorithms. We will use simple analyzer instead of standard. Because standard analyzer will split the words by spaces.

**Note:** Read more about [n-grams](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenizer.html).

For the suggestions we will use string type field with n-grams analyzer and white space analyzer.

We will predefine the type and  analyzer of fields by mappings.

### Mapping

```bash
curl -XPUT $host/searchbar/_settings?pretty -d '{
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
```bash
curl -XPUT $host/searchbar/_mapping/searchbar -d '{
  "searchbar": {
    "properties": {
      "city": {
        "type": "string",
        "fields": {
          "city_autocomplete": {
            "type": "completion",
            "analyzer": "case_insensitive",
            "search_analyzer": "case_insensitive",
            "payloads": false
          },
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
          "country_autocomplete": {
            "type": "completion",
            "analyzer": "case_insensitive",
            "search_analyzer": "case_insensitive",
            "payloads": false
          },
          "country_autosuggest": {
            "type": "string",
            "analyzer": "auto-suggest",
            "search_analyzer": "standard"
          }
        }
      }
    }
  }
}'  
```

### Data Indexing
```bash
curl -XPUT $host/searchbar/searchbar/1 -d '{
  "city": "New York",
  "country": "United States"
}'
```

### Data Browser View
For accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/rHOEixS.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALGAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsf75RGH_jHaI0iFldVUA8qAu_IuFdCiPbQoJXhucJFD7Tx0dCbrMnss3gpLkoGLSlzMWr0Rs78QzD1cInlCxvWqSgdLhvpBcAJW68g0Vhcn0xKzkLHaOzsy68EPdXOYucCl6c8hMMRGu3y4dlzbBXn60r5lbWVcwldsd4kUXc8NRk6kGMuYbn4Qx47XYODZCQPz6_vsDAwA).

### Queries
