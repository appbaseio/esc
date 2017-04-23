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
    "access_token": "OTAwNDU5MTk4M2NlYzViYzQxNzFlN2E3Yjk1MWQ2ZjhkODRjMTg5Yg=="
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
