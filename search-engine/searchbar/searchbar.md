# Use-case

### How to make normal search bar?

This chapter therefore provides a simple introduction and guide to develop normal search bar of either your products, cities, names or anything that can be two-three words query. 

The main functionality we need for the normal text searching are

1. Auto complete - While user typing we need to provide auto completion for the input queries. Auto-complete functionality should be as fast as a user types to provide instant feedback relevant to what a user has already typed in.  Elasticsearch provides a convenient way to get autocomplete up and running quickly with its completion suggester feature. 
2. Suggestions(or full text search) - Use quick suggestions to help users save time, iterate on their searches, and get the results they want. It helps to show the relevant data to user’s inputs. 
3. Exact match - When user finally hits the search button get the actual matched data. 

Elasticsearch can support to index the same field in different ways for different purposes. We will use the multi-fields provided by elasticsearch to store the data into three different fields. We need to make three sub fields related to three different functionalities. 

```
Note: Read more about concepts of [multi-field](https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html).
```

We need to disable the analyzer for the perfect field matching. Because default analyzer of elasticsearch will split the words by white spacings and punctuations which can be problematic for our search bar.
Note: Elasticsearch will convert the not analyzed field into the case sensitive field. If you want to make it case insensitive then you need to use custom analyzer which can make it case insensitive.  

```
Note: A short note on [analyzer](https://www.elastic.co/blog/found-text-analysis-part-1).
```
The field type for the autocomplete functionality must be completion. It can also be possible through n-grams and prefix suggester algorithms. We will use simple analyzer instead of standard. Because standard analyzer will split the words by spaces.
 
```
Note: Read more about [n-grams](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenizer.html). 

``` 
For the suggestions we will use string type field with n-grams analyzer and white space analyzer.

We will predefine the type and  analyzer of fields by mappings.

## Mapping

```json
PUT /searchbar
{
   "settings": {
      "analysis": {
         "analyzer": {
            "case_insensitive": {
               "tokenizer": "keyword",
               "filter": [
                  "lowercase"
               ]
            }
         }
      }
   },
   "mappings": {
      "search": {
         "properties": {
            "city": {
               "type": "string",
               "fields": {
            		"city_exact": { "type":  "string", "index":    "not_analyzed" },
			"city_completion": {"type": "completion", "index_analyzer": "simple" , "search_analyzer": "simple", "payloads": false},
			"city_suggest": {"type": "string","index_analyzer": "nGram_analyzer", "search_analyzer": "whitespace_analyzer"}
            	}
          }
      }
   }
}
```
