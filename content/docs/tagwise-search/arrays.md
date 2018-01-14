---
id: arrays
title: "Arrays Datatype"
layout: tutorial
sectionid: arrays
permalink: tagwise-search/arrays.html
next: multiple-tag-match.html
nextTitle: "Multiple Tag Match"
prev: exact-match.html
prevTitle: "Exact Tag Match"
---

This article is a part of the series on [**How to build tag wise search with Elasticsearch**](https://appbaseio.gitbooks.io/esc/content/tagwise-search/introduction.html).

## How to store data using Elasticsearch arrays

A major use-case of tags in apps is to associate a content with one or more labels, it is then but natural that a tagwise search feature should be able to retrieve the marching content by user specifying either just one or more than one tag labels. A tag wise search is also fundamentally different from a full-text search as here, we are finding an exact match of a tag with a content item.

In this post, we will be using an Array datastructure to store labels with a content document. For making the exact lookups, we will be applying  a term query on the dataset.

In Elasticsearch, there is no dedicated array type. Any field can contain zero or more values by default, however, all values in the array must be of the same datatype. If you create a new field by indexing an array, Elasticsearch will use the datatype of the first value in the array to determine the type of the new field. We can create array of strings, integers, objects or array of arrays to store the data.

Elasticsearch can also supports empty array or null array values.

Default array does not support quering each object independently of the other objects in the array. To distinguish objects stored in array from each other we need to use **Nested datatype**.

`Note:` Read more about nested datatype over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html).

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

There is no special mapping required for arrays. You can store multiple values with single field without predefining schema.

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

Here document is indexed under the `tagwise` index and `search` type.

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
          "owner": {
            "type": "string"
          },
          "repo": {
            "type": "string"
          },
          "tags": {
            "type": "string"
          },
          "url": {
            "type": "string"
          },
          "stars": {
            "type": "integer"
          },
          "language": {
            "type": "string"
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

Elasticsearch created these mappings dynamically based on our indexed data.

## Data Browser View

For accessibility, we have indexed ~300 data points of Github repos that can be viewed in the data browser [here. ![](http://i.imgur.com/x7nLB9s.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALsAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsfg8zEltX1Bae4VtdAEIGYBD3zva4XDAUUA9VTrYdZNLQd5JP0mLm4u5-Ie7D8qYvlBkqiI3yZnvcuRZPoM5wmYJTyyh-A3d-80gPrA7-YAOP1CjsElJ1Awvm7iOoQzYFWoNbFMzMRnLSrmyJf08HGhNiv-TDi-0N2SLrJ-iOAm2-0MLNsYdDFMc7va07VB2QiT6uDBzg3MVoV7a7L6bsXj06jwjF8DI8BFy4lYZ1Rkf_9VL4AA)

## Query

Elasticsearch array supports **match** as well as **term** query. Let's write our first search query for the arrays.

Syntax for **term** query -

```json
curl $host/tagwise/search/_search?pretty -d '{
  "query": {
    "term": {
      "tags": "reddit"
    }
  }
}'
```

Syntax for **match** query -

```json
curl $host/tagwise/search/_search?pretty -d '{
  "query": {
    "match": {
      "tags": "reddit"
    }
  }
}'
```

### Response:

```json
{
  "took" : 14,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 6.1179934,
    "hits" : [ {
      "_index" : "tagwise",
      "_type" : "search",
      "_id" : "AVvR1yM3gPzdwFFNDvs7",
      "_score" : 6.1179934,
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

You can also try out this query interactively  [here. ![](http://i.imgur.com/9bg2TMJ.png)](https://opensource.appbase.io/mirage/#?input_state=XQAAAAIqBQAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmHCrDFs7iDKutPu_ClxcjCYOqUqELVPJ0G6sKj4u2r8c-T_5P6GlG49XYgfc2GYuMMRuSumifCxuSSCXtOAxs6Hde1p2VgSpnD3tfQtwbKtmlUV9FWFj1xXnSypOS15FxHENksJUxXCtYmd4iVjGL1bowAxrWfOuw1nuIcWHek4srAs1sTP0SOd6XPS6-blE0WjAQt4ce9B23dy_19xYCecMoWthMwrwWTFypBAO8Vcd9w4VuVo1KU8LBRzuRLhDL0KvF_VG62ehVISj4Ty-MiHt6Wpb2oKqBeU0_RAvNWfU1QZMs-TXvpXEXsEaIoh-foBQR6mza5cKEG3-8vZnMLBXW2J5sjEUeM7tqfjdgcDJCjC3ICatsg2wVEme8RVF3cFkkDDX0MTi9_t1eIrq8yU3AHAMZqvAUb5mkmRVWPKetqsE-i4GQyerYVnSY-EJXAPnnip8IXLbYRM8d4ocCXD3R20C7ZwGFGG0MuPIwmzwrf6hStk8ddjvTn81vDwIPDnr91ov42AvY0-7Kb5CpGG6dF2kFR7xcKxyVCxYfbE8Wl2f0RTH6jk-GS7HuqFdz4MEIWS63yeqQ-jajHPetrQP81BisYnXF281pV7ajxzqx8kkTagiyRT9mQsOR_oMVCT63LKNBeCSnffodl6mf_7Qo1M)

You should next read about [**exact match**](https://appbaseio.gitbooks.io/esc/content/tagwise-search/exact-match.html).
