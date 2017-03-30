# Use-case

### Suggestions (Full Text Search)

Use quick suggestions to help users save time, iterate on their searches, and get the results they want. It helps to show the relevant data to user’s inputs.

For the suggestions we will use string type field with n-grams analyzer.

**Note:** A short note on [analyzer](https://www.elastic.co/blog/found-text-analysis-part-1).

**Note:** Read more about [n-grams](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenizer.html).

We will predefine the type and  analyzer of fields by mappings.

### Mapping

```json
curl -XPUT "$host/searchbar/_settings?pretty" -d '
{
	"settings": {
		"analysis": {
			"tokenizer": {
				"ngramizer": {
					"type": "edge_ngram",
					"min_gram": 1,
					"max_gram": 10,
					"token_chars": [
						"letter",
						"digit",
						"punctuation",
						"symbol"
					]
				}
			},
			"analyzer": {
				"auto-suggest": {
					"type": "custom",
					"tokenizer": "ngramizer",
					"filter": [
						"lowercase",
						"asciifolding"
					]
				}
			}
		}
	}
}
'
```
```json
curl -XPUT "$host/searchbar/_mapping/searchbar" -d '
{
	"properties": {
		"city": {
			"type": "string",
			"fields": {
				"city_autosuggest": {
					"type": "string",
					"analyzer": "auto-suggest",
					"search_analyzer": "standard"
				}
			}
		}
	}
}'
```

### Data Indexing
```json
curl -XPUT "$host/searchbar/searchbar/new_york" -d '{
		"city": "New York"
}'
```
### Data Browser View
View the stored document over [here](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAAJDAQAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsf75RGH_jHaI0iFldVUA8qAu_IuFdCiPbQoJXhucJFD7Tx0dCbrMnss3gpLkoGLSlzMWr0Rs78QzD1cInlCxvWqSgdLhvpBcAJW68g0Vhcn0xKzkLHaOzsy68EPdXOYucCl6c8hMMQXZU8RP8JPvBLWiIf_G_5CaVPuXWMq80wmLUMeKsvdkOKaDd_W7WG8h79UJYO3PhPFiPmXeWAeqH_-_KCceHciGmUVoS8Fm9U27k6tat03f-eyZ6WT9TUKabaooF9yVF0YIOuRMkgUbbe6dMN1PEv7QtwA).

### Queries
```json
curl "$host/searchbar/searchbar/_search?pretty" -d '{
	"query": {
		"match": {
			"city.city_autosuggest": "New York"
		}
	}
}'
```

### Query Response
```json
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "hits" : {
    "total" : 38,
    "max_score" : 2.6196778,
    "hits" : [ {
      "_index" : "searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYRgYhvsk2FETcMug",
      "_score" : 2.6196778,
      "_source" : {
        "city" : "New York",
        "country" : "United States"
      }
    }, {
      "_index" : "searchbar",
      "_type" : "searchbar",
      "_id" : "AVsMYWRohvsk2FETcOKG",
      "_score" : 1.7387071,
      "_source" : {
        "city" : "York",
        "country" : "United Kingdom"
      }
    }]
  }
}
```
