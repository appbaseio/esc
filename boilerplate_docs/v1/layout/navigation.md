# Navigation

In a way, docbase ties your .md project into a documentation hub. Navigation is the key for a hub to work correctly.

## Page Navigation

Here is an example of page navigation with docbase. Docbase automatically builds a sidebar navigation (thanks to [flatdoc](https://github.com/rstacruz/flatdoc)) using the markdown page headings.

[![](https://i.imgur.com/Hg0lrgJ.png)](http://farhan687.github.io/emberjs/v2.2.0/applications/run-loop.html)

Here is the same document rendered with Github's markdown preview.

[![](https://i.imgur.com/VFIGGnj.png)](https://github.com/farhan687/emberjs/blob/master/source/v2.2.0/applications/run-loop.md)

## Site Navigation

Site navigation allows you to navigate between pages effectively. Docbase creates a top navigation bar that's present on all pages.

[![](https://i.imgur.com/a3QL0vo.png)](http://farhan687.github.io/emberjs/)

Docbase uses two modes of creating a site navigation.

### Auto-infer navigation

In the auto infer mode, docbase builds the navigation by reading the directory structure layout.

Just like the page navigation, this takes nothing special from your end. Docbase creates the site layout and navigation based on the directory structure organization. The example shown above uses this mode.

``Note:`` This option is only available if you are building your docs from github. For other cases, refer to the **DIY** navigation layout.

### DIY

While the auto-infer mode is great to get started, sometimes you wish to have a greater control on the order in which pages appear, or perhaps label pages differently from their markdown names.

You can specify a site layout yourself in the ``docbase-config.js`` file with the ``versions`` option.

For this manual, we have provided our own layout structure which looks like this:

```
"versions": {
  "v1": [{
    "name": "getting-started",
    "label": "Getting Started",
    "files": [{
      "name": "start",
      "label": "Quick Start"
    }, {
      "name": "configure",
      "label": "Configuration Options"
    }]
  }, {
    "name": "features",
    "label": "Features",
    "files": [{
      "name": "search",
      "label": "Search"
    }, {
      "name": "colors",
      "label": "Colorful"
    }, {
      "name": "gh-pages",
      "label": "Deploy to Github"
    }, {
      "name": "versions",
      "label": "Versatile Navigation"
    }]
  }, {
    "name": "layout",
    "label": "Layout",
    "files": [{
      "name": "navigation",
      "label": "Site Navigation"
    }, {
      "name": "3col",
      "label": "Three columns"
    }]
  }]
```

## Version Switcher

Version switcher is another way to navigate between different versions, literal languages, programming languages.

You can read more about versions here.
