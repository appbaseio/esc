# Use-case

### Auto completion with Elastic Search

While user typing we need to provide auto completion for the input queries. Auto-complete functionality should be as fast as a user types to provide instant feedback relevant to what a user has already typed in.  Elasticsearch provides a convenient way to get autocomplete up and running quickly with its completion suggester feature.

The field type for the autocomplete functionality must be completion. It can also be possible through n-grams and prefix suggester algorithms. We will use simple analyzer instead of standard. Because standard analyzer will split the words by spaces.

**Note:** A short note on [analyzer](https://www.elastic.co/blog/found-text-analysis-part-1).

We will predefine the type and  analyzer of fields by mappings.

## Mapping

```json
curl -XPUT "$host/searchbar/_settings?pretty" -d '{
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
```json
curl -XPUT "$host/searchbar/_mapping/searchbar" -d '{
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

```json
curl -XPUT "$host/searchbar/searchbar/new_york" -d '{
		"city": "New York"
}'
```

## Data Browser View
View the stored document over [here](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAAJDAQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsf75RGH_jHaI0iFldVUA8qAu_IuFdCiPbQoJXhucJFD7Tx0dCbrMnss3gpLkoGLSlzMWr0Rs78QzD1cInlCxvWqSgdLhvpBcAJW68g0Vhcn0xKzkLHaOzsy68EPdXOYucCl6c8hMMQXZU8RP8JPvBLWiIf_G_5CaVPuXWMq80wmLUMeKsvdkOKaDd_W7WG8h79UJYO3PhPFiPmXeWAeqH_-_KCceHciGmUVoS8Fm9U27k6tat03f-eyZ6WT9TUKabaooF9yVF0YIOuRMkgUbbe6dMN1PEv7QtwA).

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
