# Simple Match

This article is a part of the series on [**how to build a search bar**](https://github.com/appbaseio/esc/blob/master/searchbar/introduction.md).

## How To Build A Simple Match Search

Every complex search begins its journey with simplicity.

In this post, we will go through the process of building a very simple search experience using Elasticsearch.

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

Being a NoSQL document store that works with JSON data, it comes with a convenient default for dynamic mappings. And we will exploit that to index our first data.

## Indexing Data

```bash
curl -XPUT $host/searchbar/searchbar/1 -d '{
  "city": "New York",
  "country": "United States"
}'
```

If we look back at our data mappings, they should now look like as follows

```bash
curl $host/searchbar/_mapping?pretty
```

```
{
  "searchbar": {
    "mappings": {
      "searchbar": {
        "city" : {
          "type" : "string"
        },
        "country" : {
          "type" : "string"
        }
      }
    }
  }
}
```

Elasticsearch created these mappings dynamically based on our indexed data.

## Data Browser View

For accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/gCu8brp.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALGAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsf75RGH_jHaI0iFldVUA8qAu_IuFdCiPbQoJXhucJFD7Tx0dCbrMnss3gpLkoGLSlzMWr0Rs78QzD1cInlCxvWqSgdLhvpBcAJW68g0Vhcn0xKzkLHaOzsy68EPdXOYucCl6c8hMMRGu3y4dlzbBXn60r5lbWVcwldsd4kUXc8NRk6kGMuYbn4Qx47XYODZCQPz6_vsDAwA).

## Queries

Now we will write our first search query.

```json
curl "$host/searchbar/searchbar/_search?pretty" -d '{
  "query": {
    "match": {
      "city": "New York"
    }
  }
}'
```

Response:
```json
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
      "_index" : "searchbar",
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
You can try out this query interactively with this saved query [here. ![](https://i.imgur.com/Z4Vt76n.png)](https://opensource.appbase.io/mirage/#?input_state=XQAAAALDBQAAAAAAAAA9iIhnNAWbsswtYjeQNZkpzQK4_mOzUeDpWmHIOnFYWKnjL6-LioSaiwWbKm_OIbIe7ew9C3YQvvSfy-iE0mJ3iUHlS7SxqW4Kfd54TO7SG1hbWbzeo-WSJR46OsqZykOAMwSirRgXpSq5OMBdelMP92rD8WwuEem48-PmehVw-xj9TrrjLdB6QMZ24tgkCj4S8wY4NKZdxnxGJNXHDAiW8CYZ41X_QLVWCkTCtI9soPwJzqCRAE57BJ3eXhcn_e98cm9ym9LyFbfx47JbGMzG-tP4rUljRT-KX0718OJLlPpfWKCUEm56T4kKUyQOIctFML4vd7nbIlNF_HVJf5XthjNmb9bDIZNHNbNitJK5Jn8e2EUlnz479qDBkGPUlTsmLIT7nVfXmBJdSLZ31XFe2BBUJrzKzKu0iHOJNHykD1wPyIC2MmkglG9qmC2SI2bInT4qLUhCFn1GTviO-1iAqhBzz2X8_JNCYZgCmunyXfwPwKioUdz3rOon1QKhKRcNW5ch9W2Bb5dQfRIpm8di3LIGPJ2UCwFHByI4IRXg6qCcmbVhSP43kCAxZrkuAz5PPF9avMk1BEprQN7wCpWOv5rWseLUe1bbyjFw61F71Fa-ciqEr5t84DJw4wkL7jk5FQkIpjq1CUxzIjt63aR7BZZQDRoRcQZj-oyGgV1-ai0BgkrD_och1Q)

Next, you should read about [multi match](https://github.com/appbaseio/esc/blob/master/searchbar/multi-match.md).
