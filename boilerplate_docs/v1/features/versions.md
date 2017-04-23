# Versions

Docbase is a full-featured documentation hub for .md projects of all size. It comes with a versioning feature baked right in.

## Switcher

Documentation evolves over time and docbase allows creating versions to reflect this evolution.

![](https://i.imgur.com/9rmRVWj.png)

Version switcher also works with internationalization, say you want to show language options like EN, ES, PT.

## Search

Searching for terms shows results filtered by versions.

![](https://i.imgur.com/zvUN592.png)

## How to create versions

```
|__ root
|   |__ path
|       |__ v1
|       |   |__ topic1
|       |       |__ page.md
|       |       |__ foo.md
|       |__ v2
|           |__ ...
```

For reading .md, docbase takes the ``root`` and a relative ``path`` from root which forms the location from where docbase starts reading the .md files.

**versions** are directories inside the ``root/path`` location. For creating a new version, you create a new directory.

You can read more about the directory structure that docbase confirms to here.
