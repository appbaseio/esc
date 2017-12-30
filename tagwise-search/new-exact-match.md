# Exact Match

This article is a part of the series on [**How to build tag wise search engine with Elasticsearch?**](https://appbaseio.gitbooks.io/esc/content/tagwise-search/introduction.html)

### How to do tag wise search

A major use-case of tags in apps is to associate a content with one or more labels, it is then but natural that a tagwise search feature should be able to retrieve the marching content by user specifying either just one or more than one tag labels. A tag wise search is also fundamentally different from a full-text search as here, we are finding an exact match of a tag with a content item.

In this post, we will be using an Array datastructure to store multiple labels with a content document. For making the exact lookups, we will be applying  a term query on the dataset.

### Store data using array

In Elasticsearch, there is no dedicated array type. Any field can contain zero or more values by default, however, all values in the array must be of the same datatype. If you create a new field by indexing an array, Elasticsearch will use the datatype of the first value in the array to determine the type of the new field. We can create array of strings, integers, objects or array of arrays to store the data.
