# Search

Docbase creates a delightful search experience out of the box.

## Built-in blazing fast search

Docbase builds a blazing fast (offline!) search experience.

![](http://appbaseio.github.io/Docbase/img/Search.gif)

**Features:**

1. Search auto-completion
1. High performance (it generates an offline search index!)
1. Text highlighting support
1. Target results within a specific version, page and heading section

## How search works

Docbase builds an offline search index and stores it in a file called ``search-index.json``. Every time there is a change in documentation, this file is updated by docbase.

The docbase search view uses typeahead.js for building the search view.
