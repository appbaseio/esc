---
id: simple-match
title: "Simple Match"
layout: tutorial
sectionid: simple-match
permalink: searchbar/simple-match.html
next: multi-match.html
nextTitle: "Multi Match"
prev: introduction.html
prevTitle: "Searchbar: Introduction"
---

This article is a part of the series on [**how to build a search bar**](https://appbaseio.gitbooks.io/esc/content/searchbar/introduction.html).

## How To Build A Simple Match Search

Every complex search begins its journey with simplicity.

In this post, we will go through the process of building a very simple search experience using Elasticsearch.

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

Being a NoSQL document store that works with JSON data, it comes with a convenient default for dynamic mappings. And we will exploit that to index our first data.

## Indexing Data

```bash
curl -XPUT $host/normal_searchbar/searchbar/1 -d '{
  "city": "New York",
  "country": "United States"
}'
```

If we look back at our data mappings, they should now look like as follows

```bash
curl $host/normal_searchbar/_mapping?pretty
```

```js
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

For accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/gCu8brp.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALvAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFslF8ZMg7A6kGLFGPADbJVmb5ysVqinQQuiFLkb4deUgCDkj3Ca7c1o_y8XA0-MkniaJtriPLcO0sOs-he9RgZSsY1-Dj7M1oUHcSMXEdlL__k05smSCpzBnTIbIxXMyoFoHyy8Z_g-Ku8eQnTdtXdsrQgMg_wmz9OmY-26TdzjLWp-v2Wf1WiRDeMXYvBl1QvLH_j_iLGk7AkFU5rmsqyCR3BmLVt2baZT9KRDsA_8PvEAA&editable=false)

## Query

Now we will write our first search query, **match**.

```bash{3-5}
curl "$host/normal_searchbar/searchbar/_search?pretty" -d '{
  "query": {
    "match": {
      "city": "New York"
    }
  }
}'
```

Response:

```js
{
  "took" : 28,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 7.445813,
    "hits" : [ {
      "_index" : "normal_searchbar",
      "_type" : "searchbar",
      "_id" : "1",
      "_score" : 7.445813,
      "_source" : {
        "city" : "New York",
        "country" : "United States"
      }
    } ]
  }
}
```

You can also try out this query interactively  [here. ![](https://i.imgur.com/Z4Vt76n.png)](https://opensource.appbase.io/mirage/#?input_state=XQAAAAJeBQAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmIMRwpW8tLJEeyKCwoHzPOkL9M0KdbHLZtMVPxIPMlh7YYAQinNjBTPX006UGzGERYNqNYjacxklVFkEoKyx2zaubRUqhqxScMG9gD-h7bDyj7ZQ6VU2Kj2rkJ1mds7BRVYkDfAHTEbtNa5GW20cp1fus1prbJbNXISvUEQNnPsDOsiH93N8mrqk4ZUuFt9U-a6lycH_ep550RD_dqNp8O-_A9qC47n_yrU_BAyybWtYEqbqRubgwH5baTC-QR8cqtVNANksc4-2BgClNbtmRec6DIggUIQApnQW6Ka43GNQq1VJspFdL6BLiepaIvHsDim4UET7rm6-S-XBuAgmxwXg3uRZWbHsh2dXJc7OFlkkJ5ya2vtztZPA8jbWub8fNumuGGaas26ulK15v1eC6OvUVIizE6-4gA5Hf2VtlzBtduJrH6OUSJpSwOEThH8-2BKVYsJC11RK1IZz_CfkD1pl9s6Krlk6IjK2dlIIoqFy3S5dN5Z77hoOOVGDCTlDFL450xutJaPdENBxXQP4p98KwkK4Ph6fLGgTL7c5MY7Oqgd9P-tqeiPkaYCzZ9h4OQUqcxCn6MrWlo-g3XhMAmDaXD1N8VLhNAic0F2XkN1MLisvMMdHftDHr6zn96c6i4T_5fw9rw)

---

You should next read about [**multi match**](https://appbaseio.gitbooks.io/esc/content/searchbar/multi-match.html).
