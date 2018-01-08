# Exact Match

This article is a part of the series on [**How to build tag wise search engine with Elasticsearch?**](https://appbaseio.gitbooks.io/esc/content/tagwise-search/introduction.html)

### How to do a tag wise search

Elasticsearch supports queries and filters. Queries are useful within full-text search, where results depend on a relevance score. In general, filters are used for binary yes/no searches or within queries for exact value match. Think of filters as an equivalent to the WHERE clause in SQL. Filters are faster than queries because they do not calculate the relevance score and can be easily cached.

We will be using a sample dataset containing the Github repository info, and we will be using a **term** query to perform a tag wise search.

### Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

By default Elasticsearch analyzes the data before storing it on disk. However, since we require an exact match of the data for repository tags, we will apply a `index: not_analyzed` setting to prevent the tag field from being analyzed.

We will only specify the mapping for the `tags` field. Elasticsearch will create mappings dynamically for the rest of the fields.

### Disable analyzers on `tags` field

// TODO: Use Keyword and also explain the difference wrt Text.

To store the data without analyzing it, we have to make `tags` field **not\_analyzed**. By doing this, Elasticsearch will store the data as usual without any modifications.

```json
curl -XPUT $host/tagwise/_mapping/tagwise -d '{
  "properties": {
    "tags": {
          "type": "string",
          "index": "not_analyzed"
    }
  }
}'
```

Now, let's index some data.

## Data Indexing

```json
curl -XPUT $host/tagwise/tagwise/1 -d '{
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

The final combination of a `constant_score` query which contains a `term` query will look like this:

```json
curl $host/tagwise/tagwise/_search?pretty -d '{
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

We used a `constant_score` to use the `term` query with a filter context. We could also have written the same query as below:

```json
curl $host/tagwise/tagwise/_search?pretty -d '{
  "query": {
    "term": {
      "tags": "reddit"
    }
  }
}'
```

While the latter query looks much simpler, the above query is marked by Elasticsearch for caching because of the filter context. This helps speed up subsequent searches of the same request type.

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

As we can see in the above response object, we found a hit containing the "reddit" tag.

However, we might often want to either index multiple tags with a document or search documents by more than one tags. We talk about this in the next article on [multiple tag match](https://appbaseio.gitbooks.io/esc/content/tagwise-search/multiple-tag-match.html).

