# Phrase Match

This article is a part of the series on [**How to build phrase match search engine using Elasticsearch?**](https://appbaseio.gitbooks.io/esc/content/phrase-search/introduction.html)

Phrase search is useful when the order of the keywords in our query matter. Using `match_phrase` query of Elasticsearch users can easily provide list of keywords in some specific order to search for documents containing an exact sentence or phrase  which contains those keywords in the same order rather than comparing a set of keywords in random order.

### How to do phrase search

Elasticsearch's `match_phrase` query doesn't require any predefined mappings. We can analyze the data according to our needs while storing it. Like the [match query](https://appbaseio.gitbooks.io/esc/content/searchbar/simple-match.html), the `match_phrase` query first analyzes the query string according to the defined analyzer to produce a list of terms. It then searches for all the terms, but keeps only documents that contain all of the search terms, in the same positions relative to each other.

In the following sections, we will go through the process of building a very simple phrase search for the Hackernews dataset.

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

By default Elasticsearch analyzes the data before storing it on disk. It has different tokenizer, analyzer and filters to modify the data. Mappings are useful to attach these analyzers with specific fields. At index time, by default Elasticsearch uses standard analyzer. Standard analyzer tokenize the strings and convert it to the lower case tokens.

We will use default english analyzer at the index time which can apply stemming, remove stop words, add synonyms to give us better results.

In this section, we will specify the mappings for our `text` field. Elasticsearch will create mappings dynamically for the rest of the fields.

### Put Mappings

Define the english analyzer on the `text` field to analyze it at index time.

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
curl -XPUT $host/tagwise/_mapping/search -d '{
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

### Response
