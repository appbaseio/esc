---
id: multi-match
title: "Multi Match"
layout: tutorial
sectionid: multi-match
permalink: searchbar/multi-match.html
next: auto-complete.html
nextTitle: "Auto Complete"
prev: simple-match.html
prevTitle: "Simple Match"
---

This article is a part of the series on [**how to build a search bar**](https://appbaseio.gitbooks.io/esc/content/searchbar/introduction.html).

## How To Build A Multi Match Search

It's not uncommon to come across scenarios where we want to apply a search query across multiple fields. Take an e-commerce search experience for instance, here we would want to show our users results that match either the product name or its description.

In this post, we will go through the process of building a multi match search experience (i.e. across multiple fields) using Elasticsearch.


## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

Being a NoSQL document store that works with JSON data, it comes with a convenient default for dynamic mappings. And we will exploit that to index our first data.

## Indexing Data

```json
curl -XPUT $host/normal_searchbar/searchbar/1 -d '{
  "city": "New York",
  "country": "United States"
}'
```

If we look back at our data mappings, they should now look like as follows

```json
curl $host/normal_searchbar/_mapping?pretty
```

```json
"normal_searchbar" : {
  "mappings" : {
    "searchbar" : {
      "properties" : {
        "city" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "country" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        }
      }
    }
  }
}
```

Elasticsearch created these mappings dynamically based on our indexed data.

## Data Browser View

For accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/rHOEixS.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAAKUAQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFslF8ZMg7A6kGLFGPADbJVmb5ysVqinQQuiFLkb4deUgCDkj3Ca7c1o_y8XA0-MkniaJtriPLcO0sOs-he9RgZSsY1-Dj7M1oUHcSMXEdlL__k05smSCpzBnTIbIxXMyoFoHyy8Z_g-Ku8eQnTdZF4_hjSV7EdPDTy97DMkG9PlZFBp_bLIhTq50OaXXwxPtBuMRIcPoLj3jT4xckRg5gb7pSiw9fFAJoH5HAeiXsya9za62wB2R_mv16L4HlA_xHvdGfdp0418nmqFUmW6PphBtnkRfvGlb2yeCvcT6ZS5VZTHbbm30EuT94MJLydUHyurtrtMNZaLDIZ8fEM2COgl1-0zP_-F7ACg&editable=false)

## Query

Now we will write the search query for **multi match**.

```json
curl "$host/normal_searchbar/searchbar/_search?pretty" -d '{
  "query": {
    "multi_match": {
      "query": "United States",
      "fields": ["city", "country"]
    }
  }
}'
```

A **multi_match** query is very similar to a **match** query, except it has a convenient way of searching across multiple `fields`.

Response:
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
    "total" : 20,
    "max_score" : 5.8896313,
    "hits" : [ {
      "_index" : "normal_searchbar",
      "_type" : "searchbar",
      "_id" : "1",
      "_score" : 5.8896313,
      "_source" : {
        "city" : "New York",
        "country" : "United States"
      }
    }, ... ]
  }
}
```

In the response, you will get the list of all the cities whos `country` field matches with `United States`.

You can try out this query interactively [here. ![](https://i.imgur.com/Z4Vt76n.png)](https://opensource.appbase.io/mirage/#?input_state=XQAAAAK0BQAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmIMRwpW8tLJEeyKCwoHzPOkL9M0KdbHLZtMVPxIPMlh7YYAQinNjBTPX006UGzGERYNqNYjacxklVFkEoKyx2zaubRUqhqxScMG9gD-h7bDyj7ZQ6VU2Kj2rkJ1mds7BRVYkDfAHTEbtNa5GW20cp1fus1prbJbNXISvUEQNnPsDOsiH93N8mrqk4ZUuFt9U-a6lycH_ep550RD_dqNp8O-_A9qC47n_yrU_BAyybWtYEqbqRubgwH5baTC-QSqOaNVNANksc4-2BgClNbtmRec6DIggUIQApnQW6Ka43GNQq1VJspFdL6BLifAI_I-zupa4IFDLS-eq3oykTMVHE9e6IrKvHb6vbhP8saKnhS2CQ_qXkx0ckZvsg4eCPzeCWx35T2MqDCqRc_8schvvRofTxHNCKHQ4ziO5mson_yplVSlGqxmKIc3ZjYBcBkOWNDwGomNYQzguPGCc0pV8IBHXRIUZBhplz_Fg146eLXsFr7__5mfaXglRnlw8k8SEgxCXeQRDByqHthvrhtqHBxwQLZcDckQuuwOc-DvMrqUauiIvXXmpg2s62fIQHu7PeB63NkcE_elwz5DoAqJwgtnm9GSN_cgn7UJLTscZO85i41qOLF0pCCCmeqp38E9Ich-tipAfgkk5wLmKaEuhNn_8PccSA)

---

Next, you should read about [**auto completion**](https://appbaseio.gitbooks.io/esc/content/searchbar/auto-complete.html).
