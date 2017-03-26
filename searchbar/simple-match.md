# Simple Match

### How to build a simple match search?

Every complex search begins its journey with simplicity.

In this post, we will go through the process of building a very simple search experience using Elasticsearch.

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

Being a NoSQL document store that works with JSON data, it comes with a convenient default for dynamic mappings. And we will exploit that to index our first data.

## Indexing Data

```bash
curl -XPUT $host/searchbar/searchbar/1 -d '{
	"city": "Beijing",
	"country": "China"
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

For accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here](URL-TODO).

## Queries

Now we will write our first search query.

```json
curl "$host/searchbar/searchbar/_search?pretty" -d '{
	"query": {
		"match": {
			"city": "Beijing"
		}
	}
}'
```


```json
{
  "took" : 30,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 9.956158,
    "hits" : [ {
      "_index" : "searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYQ0chvsk2FETcMem",
      "_score" : 9.956158,
      "_source" : {
        "city" : "Beijing",
        "country" : "China"
      }
    } ]
  }
}
```
