# Configuration

``yo docbase`` - the yeoman generator for docbase creates a config file from the user options. For most users, the generator should be all they need to work with docbase.

In this page, we show a sample configuration file and explain how the different options work.

## docbase-config.js options

```js
var docbaseConfig = {
  "method": "github",
  "generic": {
    "baseurl": "",
    "path": ""
  },
  "file": {
    "path": ""
  },
  "github": {
    "user": "appbaseio",
    "repo": "Docs",
    "path": "src",
    "branch": "master",
    "access_token": "YjFiZWY3NWYwYzQ4MmEwMjU4NmFiNGRkMGU4NjY3NDA5YWM3ZDdjZQ=="
  },
  "indexHtml": "./html/main.html",
  "flatdocHtml": "./bower_components/docbase/html/flatdoc.html",
  "html5mode": false,
  "default_version": null,
  "versions" : {
   "v1": [{
     "name": "sample",
     "label": "Sample Label",
     "files": [{
       "name": "sample1",
       "label": "Sample 1 Doc"
     },]
   }, {
     "name": "howtostart",
     "label": "How to start",
     "files": [{
       "name": "starting",
       "label": "Starting with docbase"
     }]
   }],
   "v2": [{
     "name": "sample",
     "label": "Sample Label",
     "files": [{
       "name": "sample1",
       "label": "Sample 2 Doc"
     }]
   }]
 }
};
```


* ``method`` - Indicates the mode for reading the markdown files,
* ``file`` - If method is file, docbase will read the ``path`` option from here.
* ``github`` - If method is github (like in this sample config), it will take various github options from this.
* ``generic`` - If method is generic, it will take ``baseurl`` (URL) and ``path`` (relative path from the URL, optional) from here.
* ``indexHTML`` is a path to the main html file. You can change the structure, put custom links or altogether provide a different file.
* ``versions`` is a nested JSON layout for the .md files. It allows specifying a sequential order to the files and providing labels. ``versions`` is optional when using the ``github`` method, as docbase can infer the layout from github's APIs.
* ``default_version`` - The main version that you want for your docs, particularly useful when not specifying the ``versions`` option.

**``Note:``** ``github.access_token`` is base64 encoded to prevent spamming. It is however not secure, we recommend only providing the necessary permissions (public_repo) for the token. Docbase uses the token to overcome the default rate-limiting restrictions by Github's API, and providing the token is optional.
