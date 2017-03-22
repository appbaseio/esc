# Use-case

### Exact Match

When user finally hits the search button get the actual matched data. 

We need to disable the analyzer for the perfect field matching. Because default analyzer of elasticsearch will split the words by white spacings and punctuations which can be problematic for our search bar. If you want to make case insensitive perfect match then you need to make separate analyzer and set the analyzer field according to it. In our scenario we will use own defined case_insensitive analyzer. 

**Note:** Learn more about [disabling analyzer](https://www.elastic.co/guide/en/elasticsearch/guide/current/_finding_exact_values.html). 

We will predefine the type and  analyzer of fields by mappings.

## Mapping


**TODO: SID** Explain about how to do mappings and how to define analyzers? 
```json
curl -XPUT 'https://URL/index/_settings?pretty' -H 'Content-Type: application/json' -d'
{
	"settings": {
  		"analysis": {
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
             		"city_exact": { "type": "string", "analyzer": "case_insensitive" },
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
  "query": {
  	"multi_match": {
		"query": "New",
		"fields": [ 
			"city.city_exact"
		]
	}
   }
}
```
## Query use-case: 1

## Query use-case: 2


