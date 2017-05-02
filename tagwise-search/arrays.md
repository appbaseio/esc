# Array Datatype

This article is a part of the series on [**How to build tag wise search engine with Elasticsearch?**](https://github.com/appbaseio/esc/blob/master/tagwise-search/introduction.md)

## How to store data using Elasticsearch arrays

It is quite possible that we want our tag field to contain more than one tag. Instead of a single string, we could index an array of tags.

In Elasticsearch, there is no dedicated array type. Any field can contain zero or more values by default, however, all values in the array must be of the same datatype. If you create a new field by indexing an array, Elasticsearch will use the datatype of the first value in the array to determine the type of the new field.

Elasticsearch can also supports empty array or null array values.

Default array do not support querying each object independently of the other objects in the array. To distinguish objects stored in array from each other we need to use **Nested datatype**.

`Note:` Read more about nested datatype over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html).

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

There is no special mapping required for arrays. You can store multiple values with single field without predefining schema.

## Indexing Data

```bash
curl -XPUT $host/tagsearch/search/1 -d '{
  "repo": "reddit",
  "tags": [
    "javascript",
    "python",
    "reddit"
  ],
  "owner": "reddit",
  "url": "https://github.com/reddit/reddit"
}'
```

Here document is indexed under the `tagsearch` index and `search` type.

If we look back at our data mappings, they should now look like as follows

```bash
curl $host/tagsearch/_mapping?pretty
```

```
{
  "tagsearch": {
    "mappings": {
      "search": {
        "properties" : {
          "owner" : {
            "type" : "string"
          },
          "repo" : {
            "type" : "string"
          },
          "tags" : {
            "type" : "string",
          },
          "url" : {
            "type" : "string"
          }
        }
      }
    }
  }
}
```

Elasticsearch created these mappings dynamically based on our indexed data.

## Data Browser View

For accessibility, we have indexed ~150 data points that can be viewed in the data browser [here. ![](http://i.imgur.com/x7nLB9s.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALHAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsoF_M8R2gxpRSSrM2RItnfZBBZ4BB6CytahtDXqL9iWugbditVu12-io_RDH6EnaWmCJyCnWfQ0iFwrgkbBo0SnU3Xqcim-Pm0-xuDmP7mhQxyoU38QedOV8pTPQXp60TPwSPITJkWwLp0zDZ0FkmDSdaWNRiL00O2mMZFoNsprHUzDlW-vmJSwNDMKKGWWwYOxt7v73H89g)

## Query

Now we will write our first search query, **term**.

```bash
curl $host/tagsearch/search/_search?pretty -d '{
  "query": {
    "term": {
      "tags": "reddit"
    }
  }
}'
```

**TODO** write about term query.

Response:

```json
{
  "took": 14,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "failed": 0
  },
  "hits": {
    "total": 1,
    "max_score": 0,
    "hits": [
      {
        "_index": "tagsearch",
        "_type": "search",
        "_id": "AVtd-WFRtBk7_I4P_kj5",
        "_score": 0,
        "_source": {
          "repo": "reddit",
          "tags": [
            "javascript",
            "python",
            "reddit"
          ],
          "owner": "reddit",
          "url": "https://github.com/reddit/reddit"
        }
      }
    ]
  }
}
```

You can also try out this query interactively  \[here. ![](https://opensource.appbase.io/mirage/#?input_state=XQAAAAKcBAAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmIz331lK48jshXTOfOI7tCDoM8Zd9yiIKWm3DN93aX2GMuvqGST6zHU_peJ4SS2h2zDqpjctgqBVDJwJiljZkC6dqlkLgT8hM9Cs7pHD2pnqvzcEbEgOt6Gg-myLtvRVmSS6VvBx-9SJv3PnFcx7Wyr5nss-M7T_idzZCq1ZeBJjNORxLqvD-kL_xhTllcypE6XRt49DTbaNGzjdUFvfUsCDryloJj0b-Jmzqqe8t3__63udaby9cslsjf9-rv_3lNNvuD62tXTMTDnlRSno-6NX4VPLTyT16wc_g9Fu__01xBmkKFiybU3sChTZ_91SlvdExdLe3mAX_LCcTRcRGkoN_T3k7i-WQjMDJJ_Z92Rx5PsexS3O3cqRoWsWFhIXMAyEFuRWZCCu7NsrBFnGw6MsgXcztpFY6ivrVdqt4Rwg6ATMkj5r2RlzXylJnUr7q015ENC0SoyHLAAX8ngKevbvuAHezDBsezvtcRDuBmE0NjE4G6_56VJX-zWsOPT_94L_y3D2984QPe5tHjss98VogrZcLxe-OD5NtzPjEbcBbG_-buX4bADRwSuyjePgO5X5TtkDONPkUbFkzQf1n52js8Eol66Z_4PCQo)

You should next read about [**multi match**](https://github.com/appbaseio/esc/blob/master/searchbar/multi-match.md).

