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
    "branch": "gh-pages",
    "access_token": ""
  },
  "indexHtml": "./html/main.html",
  "flatdocHtml": "./bower_components/docbase/html/flatdoc.html",
  "default_version": "",
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
    }
  ]
},
  "publish": "github"
}
