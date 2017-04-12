# Three Columns Layout

Docbase builds a sidebar navigation column from the content to form a 2-column layout. However, it also supports a three column layout for things like API references where having a third column for showing code snippets is useful.

## Example

![](https://i.imgur.com/0PNqxJT.png)

Image: A three-column layout with docbase. You can see it live at [http://docs.appbase.io/scalr/javascript/api-reference.html](http://docs.appbase.io/scalr/javascript/api-reference.html).

## Creating a three-column layout

If you wish to give a particular markdown page a three-column layout, then prefix the page with a JSON object that has a field ``threeColumns`` set to **true** as shown below.

```
{"threeColumns":true}

# heading

Rest of the page content.
```
