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

## Query

```json
curl "$host/searchbar/searchbar/_search?pretty" -d '{
    "suggest": {
        "city-suggest" : {
            "text" : "new",
            "completion" : {
                "field" : "city.city_autocomplete"
            }
        }
    }
}'
```

### Query Response

