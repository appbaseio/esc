# Phrase Match

This article is a part of the series on [**How to build phrase match search engine with Elasticsearch?**](https://appbaseio.gitbooks.io/esc/content/phrase-search/introduction.html)

Phrase search is useful when the order of the keywords in our query matter. Using `match_phrase` query of Elasticsearch users can easily provide list of keywords in some specific order to search for documents containing an exact sentence or phrase  which contains those keywords in the same order rather than comparing a set of keywords in random order.

### How to do phrase search

Elasticsearch's `match_phrase` query doesn't require any predefined mappings. We can analyze the data according to our needs while storing it. Like the [match query](https://appbaseio.gitbooks.io/esc/content/searchbar/simple-match.html), the `match_phrase` query first analyzes the query string according to the defined analyzer to produce a list of terms. It then searches for all the terms, but keeps only documents that contain all of the search terms, in the same positions relative to each other.

In the following sections, we will go through the process of building a very simple phrase search for the Hackernews dataset.

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

By default Elasticsearch analyzes the data before storing it on disk. It has different tokenizer, analyzer and filters to modify the data. Mappings are useful to attach these analyzers with specific fields. At index time, by default Elasticsearch uses standard analyzer.

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

To filter the data by numeric values(Github stars) you should next read about [**range query**](https://appbaseio.gitbooks.io/esc/content/tagwise-search/range-query.html).
