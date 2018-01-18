# Partial Tag Match

This article is a part of the series on [**How to build tag wise search engine with Elasticsearch?**](https://appbaseio.gitbooks.io/esc/content/tagwise-search/introduction.html)

## How to provide tag suggestions based on incomplete tokens

Elasticsearch provide an efficient way to provide the suggestions based on user's incomplete strings. It allows users to have an instant feedback related to their search, while they are still typing a query.

We’ll use a small dataset of Github repos each of which associated with multiple tags and we will be building this feature using a custom n-gram analyzer.

To implement this functionality, we will use a n-gram tokenizer with a custom type analyzer. A custom analyzer allows to combine character filters, tokenizer, and token filters all at once. In this case we have used a self defined `tokenizer` called `ngramizer` which will split on characters that don’t belong to the classes specified in `token_chars` field.

`Note:` An alternate approach can be implemented using Elasticsearch's **completion** type and queried using a  **suggester** type query. You can read more about it in our building a search-as-you-type auto-completion feature post [here](https://github.com/appbaseio/esc/blob/master/searchbar/auto-complete.md).

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

We will update the mapping for the **tags** field. We will exploit a very cool feature of Elasticsearch called [**multi-fields**](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/multi-fields.html) in doing so. Multi-fields enable indexing the same field in different ways, thus allowing for multiple ways of querying without requiring any additional effort in indexing of the data.


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

## Data Indexing

## Data Browser View


## Query



### Response
