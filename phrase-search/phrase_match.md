# Phrase Match

This article is a part of the series on [**How to build phrase match search engine using Elasticsearch?**](https://appbaseio.gitbooks.io/esc/content/phrase-search/introduction.html)

Phrase search is useful when the order of the keywords in our query matter. Using `match_phrase` query of Elasticsearch users can easily provide the list of keywords in some specific order to search for documents containing an exact sentence or phrase which contains those keywords in the same order rather than comparing a set of keywords in random order.

### How to do phrase search

Like the [match query](https://appbaseio.gitbooks.io/esc/content/searchbar/simple-match.html), the `match_phrase` query first analyzes the query string according to the defined analyzer to produce a list of terms. It then searches for all the terms, but keeps only documents that contain all of the search terms, in the same positions relative to each other. Our sample dataset contains comments, posts etc. Elasticsearch provides special analyzers to deal with language specific texts.

In the following sections, we will go through the process of building a very simple phrase search for the Hackernews dataset.

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

By default, Elasticsearch analyzes the data before storing it on disk. It has different tokenizer, analyzer and filters to modify the data. Mappings are useful to attach these analyzers with specific fields. At index time, by default Elasticsearch uses the standard analyzer. Standard analyzer tokenizes the strings and converts it to the lower case tokens.

We will use default English analyzer at the index time which can apply stemming, remove stop words, add synonyms to give us better results.

### English Analyzer
The default analyzer of Elasticsearch contains following components:
* **Tokenizer**: Splits the text into individual words by space or defined grammar.
* **TokenFilters**: Filters the tokenized words. It lowercases all tokens, removes stop words, removes redundant tokens etc.

English analyzer analyzes the text in the following way. Example text - "I'm not happy about the foxes
".
* First it tokenizes the text into words - [I'm, not, happy, about, the, foxes]
* Lowercases tokens: [i'm, not, happy, about, the, foxes]
* Removes stopwords: [i'm, happy, about, foxes]
* Stems tokens to their root form: [i'm, happi, about, fox]

By using the english analyzer, we can match text more loosely. By default Elasticsearch uses same analyzer at index time and search time to ensure that the terms in the query are in the same format as the terms in the index.

Now, we will specify the mappings for our `text` field. Elasticsearch will create mappings dynamically for the rest of the fields.

### Put Mappings

Define the English analyzer on the `text` field to analyze it at index time.

```json
curl -XPUT $host/hackernews/_mapping/post -d '{
  "properties": {
    "text": {
      "type": "string",
      "analyzer": "english"
    }
  }
}'
```
We just put **mapping** on `post` type of `hackernews` index. Now, let's index some data.

## Data Indexing

```json
curl -XPUT $host/hackernews/_mapping/post -d '{
  "by": "dmihal",
  "id": 13102152,
  "parent": 13101870,
  "text": "Cool library! I&#x27;m a huge fan of Meteor.js, which provides a similar isomorphic database. Cool to see this implemented in such a lightweight package!",
  "time": 1480890919,
  "p_type": "comment",
  "score": 0
}'
```
We just indexed our first document. We already created sample database. You can tryout your own queries against it. Checkout our next section to play with it.

## Data Browser View

For accessibility, we have indexed ~6000 data points of Github repos that can be viewed in the data browser [here. ![](http://i.imgur.com/x7nLB9s.png)](https://opensource.appbase.io/dejavu/live/#?input_state=XQAAAALxAAAAAAAAAAA9iIqnY-B2BnTZGEQz6wkFsyS2qaEZIwD-J9none24PyYH8yBXUWZ1fjjzdmdQqiDSYIwX4TuBH3IQtfCk1YLwT0kR9-r0YWMhn1GxDTldPTCD836HnpPYGINlfz27teRoEy1L78YMlLzUoLIYWjaUV04UwEet4YmZw_ADbiLDT1RhM_1XOaFqFsgEhHTBnHFMCY5VI4poDJz0BABqDSKR5qF76qvBs6Smde9lws1D6g_epJiEVMK0611dw8BoWkl1yP-N1SAA)

## Query

Next, we will move to the queries section. Here, we will be using `match_phrase` query to match the phrases. `match_phrase` query first analyze the provided text using the explicit defined analyzer, or using the default search analyzer and produces a list of terms.

### Exact-phrase match

In order to match all the terms consecutively in the same order relative to each other use default `match_phrase` query.

```json
curl $host/hackernews/post/_search?pretty -d '{
  "query": {
    "match_phrase" : {
      "text": "Cool library"
    }
  }
}'
```

Here, `text` is the Elasticsearch field against which we performed the phrase match query.

### Mix Search

Every time we can't expect that users will provide the exact query terms with the proper order. Elasticsearch provides a way to match the documents even though the term's positions aren’t exactly equivalent.

We can pass the `slop` parameter in the following way to match the documents which contain all the query terms but in a different order or may be with the distance between them.

```json
curl $host/hackernews/post/_search?pretty -d '{
  "query": {
    "match_phrase": {
      "text": {
        "query": "Cool library Meteor.js",
        "slop": 7
      }
    }
  }
}'
```

You can run above query and can get the matched document. If you check out the inserted document, the difference between the position of `"Cool library"` and `"Meteor.js"` will be the 7 words.

#### Response

```json
{
  "took" : 21,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 1.5155549,
    "hits" : [ {
      "_index" : "hackernews",
      "_type" : "post",
      "_id" : "AVtNnwdOtBk7_I4P_hnC",
      "_score" : 1.5155549,
      "_source" : {
        "by" : "dmihal",
        "id" : 13102152,
        "parent" : 13101870,
        "text" : "Cool library! I&#x27;m a huge fan of Meteor.js, which provides a similar isomorphic database. Cool to see this implemented in such a lightweight package!",
        "time" : 1480890919,
        "p_type" : "comment",
        "score" : 0
      }
    } ]
  }
}
```
