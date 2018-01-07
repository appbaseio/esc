# Multi Match

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

```
{
  "searchbar": {
    "mappings": {
      "searchbar": {
        "city" : {
          "type" : "text"
        },
        "country" : {
          "type" : "text"
        }
      }
    }
  }
}
```

Elasticsearch created these mappings dynamically based on our indexed data.

## Data Browser View

For accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/rHOEixS.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALGAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsf75RGH_jHaI0iFldVUA8qAu_IuFdCiPbQoJXhucJFD7Tx0dCbrMnss3gpLkoGLSlzMWr0Rs78QzD1cInlCxvWqSgdLhvpBcAJW68g0Vhcn0xKzkLHaOzsy68EPdXOYucCl6c8hMMRGu3y4dlzbBXn60r5lbWVcwldsd4kUXc8NRk6kGMuYbn4Qx47XYODZCQPz6_vsDAwA)

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

You can try out this query interactively [here. ![](https://i.imgur.com/Z4Vt76n.png)](https://opensource.appbase.io/mirage/#?input_state=XQAAAAIZBgAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmHIOnFYWKnjL6-LioSaiwWbKm_OIbIe7ew9C3YQvvSfy-iE0mJ3iUHlS7SxqW4Kfd54TO7SG1hbWbzeo-WSJR46OsqZykOAMwSirRgXpSq5OMBdelMP92rD8WwuEem48-PmehVw-xj9TrrjLdB6QMZ24tgkCj4S8wY4NKZdxnxGJNXHDAiW8CYZ41X_QLVWCkTCtI9soPwJzqCRAE57BJ3eXhcn_e98cm9ym9LyFbfx47JbGMzG-tP4raO9YJ5f9ys89CsvMS6zZUYGVO9dQZAhRFFYo_azv4LTZfriF9_BEsssqGR2KjAWzg9H8uzZ2EguhV32efxyNTdJ6xpyuZysRE6nwfghFkkQvlqt65nFaorFSIZLo0QsPAXUrR3tK1o3aLZWYYZJkoALfzyHFSjEMprRpOb7vkaoV0XRkIimDiddxkky9n3fggH_wXvCqIC6GU1iMa-DsL0u7WEKyLW_8ptWJO4JlOCR2rIoi-K-wSfzWIMX-Z3BT8N_zgvVO5smP0UQ_5u6x04iqcr36BmXa7GyWHvCj88ywEcNffBvfv24RlKHznoICNln-38-olmY6t6KQrzlTcsUVyJYXBX6qv7myCJ_yWBoZJFPFKBNQgnhRdsZxIrI_t9XwlP-oLV7QPG0OTvoguT4B8xYnizAn_j3YTGuzf_7ku_x)

Next, you should read about [**auto completion**](https://appbaseio.gitbooks.io/esc/content/searchbar/auto-complete.html).
