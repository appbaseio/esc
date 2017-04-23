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
    "repo": "esc",
    "path": "",
    "branch": "master",
    "access_token": "ZDYyNTY1YjE3NWRkYWIyOGE1ZmIwNTIxM2NiNGRkMzg5ZTc2YjhmNA=="
  },
  "indexHtml": "./html/main.html",
  "flatdocHtml": "./bower_components/docbase/html/flatdoc.html",
  "default_version": "v1",
  "manual_override": false,
  "versions" : {
  "v1": [
    {
      "name": "searchbar",
      "label": "Basic Searchbar",
      "files": [
        {
          "name": "introduction",
          "label": "Index"
        },
        {
          "name": "simple-match",
          "label": "Simple Match"
        },
        {
          "name": "multi-match",
          "label": "Multi Match"
        },
        {
          "name": "auto-complete",
          "label": "Auto Complete"
        },
        {
          "name": "suggestions",
          "label": "Suggestions"
        },
        {
          "name": "searchbar",
          "label": "Searchbar"
        }
      ]
    },
    {
      "name": "tagwise-search",
      "label": "Tagwise Search",
      "files": [
        {
          "name": "introduction",
          "label": "Introduction"
        },
        {
          "name": "exact-match",
          "label": "Exact Match"
        },
        {
          "name": "arrays",
          "label": "Arrays"
        }
      ]
    }
  ]
},
  "publish": "github"
}
