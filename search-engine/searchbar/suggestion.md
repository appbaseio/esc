# Use-case

### Suggestions (Full Text Search)

Use quick suggestions to help users save time, iterate on their searches, and get the results they want. It helps to show the relevant data to user’s inputs. 

For the suggestions we will use string type field with n-grams analyzer.

**Note:** A short note on [analyzer](https://www.elastic.co/blog/found-text-analysis-part-1).

**Note:** Read more about [n-grams](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenizer.html). 

We will predefine the type and  analyzer of fields by mappings.

## Mapping


**TODO: SID** Explain about how to do mappings and how to define analyzers? 
```json
curl -XPUT 'https://URL/index/_settings?pretty' -H 'Content-Type: application/json' -d'
{
	"settings": {
  		"analysis": {
    			"filter": {
      				"nGram_filter": {
        				"type": "edge_ngram",
						"min_gram": 1,
						"max_gram": 20,
						"token_chars": [
					  		"letter",
					  		"digit",
         				 	"punctuation",
        				    "symbol"
    					]
     				 }
   			 	},
  			 	"analyzer": {
      				"nGram_analyzer": {
					"type": "custom",
					"tokenizer": "whitespace",
					"filter": [
					 	 "lowercase",
					  	 "asciifolding",
					  	 "nGram_filter"
					]
    			},
      			"standard_analyzer": {
					"type": "custom",
					"tokenizer": "standard",
					"filter": [
					  	"lowercase",
					  	"asciifolding"
					]
      			},
       			"case_insensitive": {
          			"tokenizer": "keyword",
           			"filter": [
               			"lowercase"
            		]             
        		}   
   			 }
 		 }
	}
}
'
```
```json
curl -XPUT 'https://URL/index/_mapping/type' -H 'Content-Type: application/json' -d'
{
     "properties": {
         "city": {
               "type": "string",
                "fields": {
					"city_suggest": {"type": "string","analyzer": "nGram_analyzer", "search_analyzer": "nGram_analyzer"}
                }
          }
     }
}
```

## Data Indexing
```json

PUT /searchengine/searchbar/1
{
  "city": "New York"
}

```

## Data Browser View

## Queries
```json
curl -XGET 'https://URL/searchengine/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "suggest": {
        "city-suggest" : {
            "text" : "new",
            "completion" : {
                "field" : "city.city_completion"
            }
        }
    }
}
```

## Query use-case: 1

## Query use-case: 2


