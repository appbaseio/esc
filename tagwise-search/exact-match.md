# Exact Match

This article is a part of the series on [**How to build tag wise search engine with Elasticsearch?**](https://appbaseio.gitbooks.io/esc/content/tagwise-search/introduction.html)

### How to do tag wise search

Elasticsearch supports queries as well as data filters. Queries help for full-text search or where the result depends on a relevance score. In general, filters used for binary yes/no searches or for queries on exact values. Filters are faster then queries because they do not calculate relevance score and can be easily cached.

In this scenario, we are not interested in calculating relevance score. We just want to filter the data according to specified tags.

To store the data we will first put mapping on our index and then to query these data we will use **term** query with **constant_score** filter. The following section shows you how to store and match the data without analyzing it.

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

By default Elasticsearch analyzes the data before storing it on disk. It has different tokenizer, analyzer and filters to modify the data. Mappings are useful to attach these analyzers with specific fields.

In this section, we will specify the mappings for our `tags` field. Elasticsearch will create mappings dynamically for the rest of the fields.

### Disable analyzers on `tags` field

To store the data without analyzing it, we have to make `tags` field **not_analyzed**. By doing this Elasticsearch will store the data as usual without any modifications.

```json
curl -XPUT $host/tagwise/_mapping/search -d '{
  "properties": {
    "tags": {
  		"type": "string",
  		"index": "not_analyzed"
    }
  }
}'
```
We just put **mapping** on `search` type of `tagwise` index. Now, let's index some data.

## Data Indexing

```json
curl -XPUT $host/tagwise/search/1 -d '{
  "repo" : "reddit",
  "tags" : [ "javascript", "python", "reddit" ],
  "owner" : "reddit",
  "url" : "https://github.com/reddit/reddit",
  "stars" : 13053,
  "language" : "Python",
  "created-on" : "2008-06-18T23:30:53Z"
}'
```
Voila! We indexed our first document with id `1`. We already created sample database. You can tryout your own queries against it. Checkout our next section to play with it.

## Data Browser View

For accessibility, we have indexed ~300 data points of Github repos that can be viewed in the data browser [here. ![](http://i.imgur.com/x7nLB9s.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALsAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsfg8zEltX1Bae4VtdAEIGYBD3zva4XDAUUA9VTrYdZNLQd5JP0mLm4u5-Ie7D8qYvlBkqiI3yZnvcuRZPoM5wmYJTyyh-A3d-80gPrA7-YAOP1CjsElJ1Awvm7iOoQzYFWoNbFMzMRnLSrmyJf08HGhNiv-TDi-0N2SLrJ-iOAm2-0MLNsYdDFMc7va07VB2QiT6uDBzg3MVoV7a7L6bsXj06jwjF8DI8BFy4lYZ1Rkf_9VL4AA)

## Query

The `term` query will look for the exact value that we specify. By itself, a `term` query is simple. It accepts a field name and the value that we wish to find. Usually, when looking for an exact value, we don’t want to score the query. We just want to include/exclude documents, so we will use a `constant_score` query to execute the term query in a non-scoring mode and apply a uniform score of one.

The final combination will be a `constant_score` query which contains a `term` query looks like this:

```json
curl $host/tagwise/search/_search?pretty -d '{
  "query": {
    "constant_score" : {
      "filter" : {
        "term" : {
          "tags" : "reddit"
        }
      }
    }
  }
}'
```
We used a `constant_score` to convert the `term` query into a filter.

### Response

```json
{
  "took" : 8,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 1.0,
    "hits" : [ {
      "_index" : "tagwise",
      "_type" : "search",
      "_id" : "AVvR1yM3gPzdwFFNDvs7",
      "_score" : 1.0,
      "_source" : {
        "repo" : "reddit",
        "tags" : [ "javascript", "python", "reddit" ],
        "owner" : "reddit",
        "url" : "https://github.com/reddit/reddit",
        "stars" : 13053,
        "language" : "Python",
        "created-on" : "2008-06-18T23:30:53Z"
      }
    } ]
  }
}
```

To match the documents by multiple tags you should next read about [multiple tag match](https://appbaseio.gitbooks.io/esc/content/tagwise-search/multiple-tag-match.html). 
