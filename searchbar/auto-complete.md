# Use-case

### Auto completion with Elastic Search

While user typing we need to provide auto completion for the input queries. Auto-complete functionality should be as fast as a user types to provide instant feedback relevant to what a user has already typed in.  Elasticsearch provides a convenient way to get autocomplete up and running quickly with its completion suggester feature.

The field type for the autocomplete functionality must be completion. It can also be possible through n-grams and prefix suggester algorithms. We will use simple analyzer instead of standard. Because standard analyzer will split the words by spaces.
**TODO**: Add why and which analyzer we used?
**Note:** A short note on [analyzer](https://www.elastic.co/blog/found-text-analysis-part-1).

We will predefine the type and  analyzer of fields by mappings.

## Mapping

```bash
curl -XPUT $host/searchbar/_settings?pretty -d '{
	"analyzer": {
		"case_insensitive": {
			"tokenizer": "keyword",
			"filter": [
				"lowercase"
			]             
		}   
	}
}'
```
```bash
curl -XPUT $host/searchbar/_mapping/searchbar -d '{
	"properties": {
		"city": {
			"type": "string",
			"fields": {
				"city_autocomplete": {
					"type": "completion",
					"analyzer": "case_insensitive",
					"search_analyzer": "case_insensitive",
					"payloads": false
				}
			}
		}
	}
}'
```

## Data Indexing

```bash
curl -XPUT $host/searchbar/searchbar/new_york -d '{
		"city": "New York"
}'
```

## Data Browser View
For accessibility, we have indexed ~15,000 data points that can be viewed in the data browser [here. ![](https://i.imgur.com/rHOEixS.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALGAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsf75RGH_jHaI0iFldVUA8qAu_IuFdCiPbQoJXhucJFD7Tx0dCbrMnss3gpLkoGLSlzMWr0Rs78QzD1cInlCxvWqSgdLhvpBcAJW68g0Vhcn0xKzkLHaOzsy68EPdXOYucCl6c8hMMRGu3y4dlzbBXn60r5lbWVcwldsd4kUXc8NRk6kGMuYbn4Qx47XYODZCQPz6_vsDAwA).

## Query

```json
curl "$host/searchbar/searchbar/_search?pretty" -d '{
    "suggest": {
        "city-suggest" : {
            "text" : "New Y",
            "completion" : {
                "field" : "city.city_autocomplete"
            }
        }
    }
}'
```

### Query Response

```json
{
  "took" : 22,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "hits" : {
    "total" : 15506,
    "max_score" : 1.0,
    "hits" : [ {
      "_index" : "searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYRgYhvsk2FETcMtt",
      "_score" : 1.0,
      "_source" : {
        "city" : "Mukilteo",
        "country" : "United States"
      }
    }]
  },
  "suggest" : {
    "city-suggest" : [ {
      "text" : "New Y",
      "offset" : 0,
      "length" : 5,
      "options" : [ {
        "text" : "New York",
        "score" : 1.0
      } ]
    } ]
  }
}
```
