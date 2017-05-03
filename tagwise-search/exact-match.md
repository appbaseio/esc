# Exact Match

This article is a part of the series on [**How to build tag wise search engine with Elasticsearch?**](https://appbaseio.gitbooks.io/esc/content/tagwise-search/introduction.html)

### How to do tag wise search

Elasticsearch supports queries as well as data filters. Queries help for full-text search or where the result depends on a relevance score. In general, filters used for binary yes/no searches or for queries on exact values. Filters are faster then queries because they do not calculate relevance score and can be easily cached.

In this post, we will show how to match exact values using Elasticsearch `term` query along with `constant_score` filter.

## Defining Mappings

If you have worked with a SQL database system before, you are probably familiar with the idea of a schema. Elasticsearch's equivalent of a schema definition is a mapping.

By default Elasticsearch analyzes the data before storing it on disk. It has different tokenizer, analyzer and filters to modify the data. Mappings are useful to attach these analyzers with specific fields.

In this section, we will specify the mappings for our `tags` field. Elasticsearch will create mappings dynamically for the rest of the fields.

### Disable analyzers on `tags` field

We would ideally want the autocompletion feature to work in a case agnostic fashion and at the granularity of phrases, i.e. typing a partial phrase should bring up the rest of the phrase in the autocompletion. To do this, we will create a **case_insensitive** analyzer that tokenizes the text as is (i.e. no white space splitting) and applies a lowercase filter. You can read more about analyzers over [here](https://www.elastic.co/blog/found-text-analysis-part-1).

```bash
curl -XPUT $host/searchbar/_settings?pretty -d '{
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