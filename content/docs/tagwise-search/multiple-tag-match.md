# Multiple Tag match

This article is a part of the series on [**How to build tag wise search with Elasticsearch**](https://appbaseio.gitbooks.io/esc/content/tagwise-search/introduction.html).

## How to find multiple exact values

A major use-case of tags in apps is to associate a content with one or more labels, it is then but natural that a tagwise search feature should be able to retrieve the matching content by user specifying either just one or more than one tag labels in union or intersection output modes.

In this chapter, we will be using an Array data structure to store more than one label with a content document. For making the exact lookups for multiple tagwise, we will be applying a term query along with boolean clause on the dataset.

### How to store data using Elasticsearch arrays

For one or more then one inputs elasticsearch by default considers that field as an array type. However, all values in the array must be of the same datatype. If you create a new field by indexing an array, Elasticsearch will use the datatype of the first value in the array to determine the type of the new field. We can create array of strings, integers, objects or array of arrays to store the data.

Default array does not support querying each object independently of the other objects in the array. To distinguish objects stored in array from each other we need to use **Nested datatype**.

`Note:` You can read more about nested datatype over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html).

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

By default Elasticsearch analyzes the data before storing it on disk. However, since we require an exact match of the data for repository tags, we will apply a `index: not_analyzed` setting to prevent the tag field from being analyzed.

We will only specify the mapping for the tags field. Elasticsearch will create mappings dynamically for the rest of the fields.

### Disable analyzers on `tags` field

To store the data without analyzing it, we have to make `tags` field **not\_analyzed**. By doing this Elasticsearch will store the data as usual without any modifications.

```json
curl -XPUT $host/tagwise/_mapping/search -d '{
  "properties": {
    "tags": {
      "type": "keyword"
    }
  }
}'
```

We just put **mapping** on `search` type of `tagwise` index. Now, let's index some data.

## Indexing Data

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

If we look back at our data mappings, they should now look like as follows

```json
curl $host/tagwise/_mapping?pretty
```

```json
{
  "tagwise": {
    "mappings": {
      "search": {
        "properties": {
          "owner" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "repo" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "tags": {
            "type": "keyword"
          },
          "url" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "stars": {
            "type": "long"
          },
          "language" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          },
          "created-on": {
            "type": "date"
          }
        }
      }
    }
  }
}
```

We already created sample database. You can tryout your own queries against it. Checkout our next section to play with it.

## Data Browser View

For accessibility, we have indexed ~300 data points of Github repos that can be viewed in the data browser [here. ![](http://i.imgur.com/x7nLB9s.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALsAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsfg8zEltX1Bae4VtdAEIGYBD3zva4XDAUUA9VTrYdZNLQd5JP0mLm4u5-Ie7D8qYvlBkqiI3yZnvcuRZPoM5wmYJTyyh-A3d-80gPrA7-YAOP1CjsElJ1Awvm7iOoQzYFWoNbFMzMRnLSrmyJf08HGhNiv-TDi-0N2SLrJ-iOAm2-0MLNsYdDFMc7va07VB2QiT6uDBzg3MVoV7a7L6bsXj06jwjF8DI8BFy4lYZ1Rkf_9VL4AA)

## Query

Elasticsearch provides a way through bool query to combine the multiple query types into a single query with `and`, `or`, and `not` logic.

### Bool Query

The bool query is composed of four clauses\(query\).

* `must`: All of these clauses must match. The equivalent of **AND**.
* `must_not`: All of these clauses must not match. The equivalent of **NOT**.
* `should`: At least one of these clauses must match. The equivalent of **OR**.
* `filter`: The query must appear in matching documents. This query ignores the score and executes it in filter context.

We will execute bool queries in non-scoring mode since we have disabled analyzer on `tags` field. We will use `constant_score` query to wrap everything with its filter clause.

So our basic query json structure looks like this:

```json
{
   "query" : {
      "constant_score" : {
         "filter" : {
            "bool" : {
              "should" : [...],
              "must_not" : [...],
              "must": [...],
              "filter": [...]
           }
         }
      }
   }
}
```

We will use `must` and `should` clauses to filter the data. Through `must` clause we can get the results which contain all the mentioned tags and through `should` clause we can get the results which contain either of the mentioned tags.

### Must Query

We will use `term` query inside `must` clause. The `term` query finds documents that contain the exact term specified at the index time and `must` query take **AND** of all the results.

```json
curl $host/tagwise/search/_search?pretty -d '{
   "query" : {
      "constant_score" : {
         "filter" : {
            "bool" : {
              "must": [
                {
                  "term": {
                    "tags": "reddit"
                  }
                },
                {
                  "term": {
                    "tags": "python"
                  }
                }
              ]
           }
         }
      }
   }
}'
```

#### Response

```json
{
  "took": 20,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "failed": 0
  },
  "hits": {
    "total": 1,
    "max_score": 1,
    "hits": [
      {
        "_index": "tagwise",
        "_type": "search",
        "_id": "AVvR1yM3gPzdwFFNDvs7",
        "_score": 1,
        "_source": {
          "repo": "reddit",
          "tags": [
            "javascript",
            "python",
            "reddit"
          ],
          "owner": "reddit",
          "url": "https://github.com/reddit/reddit",
          "stars": 13053,
          "language": "Python",
          "created-on": "2008-06-18T23:30:53Z"
        }
      }
    ]
  }
}
```

### Should Query

The `should` query in filter context fetches documents which match with at least one of the mentioned should queries.

```json
curl $host/tagwise/search/_search?pretty -d '{
   "query" : {
      "constant_score" : {
         "filter" : {
            "bool" : {
              "should": [
                {
                  "term": {
                    "tags": "reddit"
                  }
                },
                {
                  "term": {
                    "tags": "python"
                  }
                }
              ]
           }
         }
      }
   }
}'
```

#### Response:

As you can see in the response the first result contains only one of the mentioned tag - `python`.

```json
{
  "took": 28,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "failed": 0
  },
  "hits": {
    "total": 51,
    "max_score": 1,
    "hits": [
      {
        "_index": "tagwise",
        "_type": "search",
        "_id": "AVvR1yI5hvsk2FETc3bb",
        "_score": 1,
        "_source": {
          "repo": "awesome-python",
          "tags": [
            "awesome",
            "collections",
            "python"
          ],
          "owner": "vinta",
          "url": "https://github.com/vinta/awesome-python",
          "stars": 33500,
          "language": "Python",
          "created-on": "2014-06-27T21:00:06Z"
        }
      }
    ]
  }
}
```

You can also try out this query interactively  [here. ![](http://i.imgur.com/9bg2TMJ.png)](https://opensource.appbase.io/mirage/#?input_state=XQAAAAIqBQAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmHCrDFs7iDKutPu_ClxcjCYOqUqELVPJ0G6sKj4u2r8c-T_5P6GlG49XYgfc2GYuMMRuSumifCxuSSCXtOAxs6Hde1p2VgSpnD3tfQtwbKtmlUV9FWFj1xXnSypOS15FxHENksJUxXCtYmd4iVjGL1bowAxrWfOuw1nuIcWHek4srAs1sTP0SOd6XPS6-blE0WjAQt4ce9B23dy_19xYCecMoWthMwrwWTFypBAO8Vcd9w4VuVo1KU8LBRzuRLhDL0KvF_VG62ehVISj4Ty-MiHt6Wpb2oKqBeU0_RAvNWfU1QZMs-TXvpXEXsEaIoh-foBQR6mza5cKEG3-8vZnMLBXW2J5sjEUeM7tqfjdgcDJCjC3ICatsg2wVEme8RVF3cFkkDDX0MTi9_t1eIrq8yU3AHAMZqvAUb5mkmRVWPKetqsE-i4GQyerYVnSY-EJXAPnnip8IXLbYRM8d4ocCXD3R20C7ZwGFGG0MuPIwmzwrf6hStk8ddjvTn81vDwIPDnr91ov42AvY0-7Kb5CpGG6dF2kFR7xcKxyVCxYfbE8Wl2f0RTH6jk-GS7HuqFdz4MEIWS63yeqQ-jajHPetrQP81BisYnXF281pV7ajxzqx8kkTagiyRT9mQsOR_oMVCT63LKNBeCSnffodl6mf_7Qo1M)

---

You should next read about [**partial tag match**](https://appbaseio.gitbooks.io/esc/content/tagwise-search/partial-tag-match-tbd.html).
