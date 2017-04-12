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
      "name": "getting-started",
      "label": "Getting Started",
      "files": [
        {
          "name": "start",
          "label": "Quick Start"
        },
        {
          "name": "configure",
          "label": "Configuration Options"
        }
      ]
    },
    {
      "name": "features",
      "label": "Features",
      "files": [
        {
          "name": "search",
          "label": "Search"
        },
        {
          "name": "colors",
          "label": "Colorful"
        },
        {
          "name": "gh-pages",
          "label": "Deploy to Github"
        },
        {
          "name": "versions",
          "label": "Versatile Navigation"
        }
      ]
    },
    {
      "name": "layout",
      "label": "Layout",
      "files": [
        {
          "name": "navigation",
          "label": "Site Navigation"
        },
        {
          "name": "3col",
          "label": "Three columns"
        }
      ]
    }
  ],
  "v2": [
    {
      "name": "changelog",
      "label": "Changes",
      "files": [
        {
          "name": "changelog",
          "label": "Changelog"
        }
      ]
    }
  ]
},
  "publish": "github"
}
