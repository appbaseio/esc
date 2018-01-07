# Simple Match

This article is a part of the series on [**how to build a search bar**](https://appbaseio.gitbooks.io/esc/content/searchbar/introduction.html).

## How To Build A Simple Match Search

Every complex search begins its journey with simplicity.

In this post, we will go through the process of building a very simple search experience using Elasticsearch.

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

For accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/gCu8brp.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALvAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsfHIpqiZLy7KkpFdELeIYbSmc-tBzk85k8KWOC8MaaYbaeds-YXPQCzqHfy7yoiJ7CC_QkR8qYcAPJ0OVXxilr-HlzZd0JFHROj9X0nkOPakZXQm9sugL0UVvjqjJCuXeCq-_LtiPbe1jGNvX8752yf7RHNLAlwLGQK6wg-CPBULmx7tZsraAZnEhJHOqzlqm6pxpluPVq-rhncN1_hQAAe03d4AneZI9XsPRMTd-IR4AA&editable=false)

## Query

Now we will write our first search query, **match**.

```json
curl "$host/normal_searchbar/searchbar/_search?pretty" -d '{
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
You can also try out this query interactively  [here. ![](https://i.imgur.com/Z4Vt76n.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAAL0AAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsgyst_a6AA7la7xGgo6LTUKOqAQYkqB7OAxLvcDUiuirzEaSLAa-TFXtkzjoOsJZkJb2CAqyGQdl_xWKhi0q67x8xe2oe602Ekig7dDUHeYh578hIUqwMmJllugs_0hDHlOleHqHoP9zKctLto4QdhWjZyUc90ubSfVLXrOys6wYopIedXTh5I36RTdTZjw4JzZy3C0aeADsNEQkUlRdibCWbZSs4A1HcyElGD7k9hj_4H64AA&editable=false)

You should next read about [**multi match**](https://appbaseio.gitbooks.io/esc/content/searchbar/multi-match.html).
