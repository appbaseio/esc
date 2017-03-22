# Use-case

### How to make normal search bar?

This chapter therefore provides a simple introduction and guide to develop normal search bar of either your products, cities, names or anything that can be two-three words query. 

The main functionality we need for the normal text searching are

[1. Auto complete](https://github.com/appbaseio/esc/blob/searchbar/search-engine/searchbar/auto-complete.md)
[2. Suggestions(or full text search)](https://github.com/appbaseio/esc/blob/searchbar/search-engine/searchbar/suggestion.md)
[3. Exact match ](https://github.com/appbaseio/esc/blob/searchbar/search-engine/searchbar/exact-match.md)

Elasticsearch can support to index the same field in different ways for different purposes. We will use the multi-fields provided by elasticsearch to store the data into three different fields. We need to make three sub fields related to three different functionalities. 

```
Note: Read more about concepts of [multi-field](https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html).
```
