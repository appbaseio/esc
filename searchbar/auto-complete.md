# Use-case

### Auto completion with Elastic Search

While user typing we need to provide auto completion for the input queries. Auto-complete functionality should be as fast as a user types to provide instant feedback relevant to what a user has already typed in.  Elasticsearch provides a convenient way to get autocomplete up and running quickly with its completion suggester feature. 

The field type for the autocomplete functionality must be completion. It can also be possible through n-grams and prefix suggester algorithms. We will use simple analyzer instead of standard. Because standard analyzer will split the words by spaces.

**Note:** A short note on [analyzer](https://www.elastic.co/blog/found-text-analysis-part-1).

We will predefine the type and  analyzer of fields by mappings.

## Mapping

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
            			"city_completion": {"type": "completion", "analyzer": "simple" , "search_analyzer": "simple", "payloads": false}
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
