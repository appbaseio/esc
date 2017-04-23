# Quick Start

This is a quick start guide for getting up and running with your docbase project.

## Docbase

[Docbase](https://github.com/appbaseio/Docbase) turns your **markdown** documentation project into a collaborative HTML site. It:

* fetches the markdown files and layout from a Github hosted repository (or a local filesystem)
* renders it as a beautiful single HTML site
* presents docs in gorgeous colorful themes, and it’s responsive!
* deploys to gitHub pages
* works with travis-ci
* has no server-side components
* comes baked with a delightful search experience
* is open source under an MIT License

## Getting Started

Docbase comes with a yeoman generator that does all of the above with a simple ``yo docbase`` command.

```bash
1. npm install -g yo

█████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

2. npm install -g generator-docbase

██████████▒▒▒▒▒▒▒▒▒▒

3. yo docbase

Welcome to
    .___           ___.
  __| _/____   ____\_ |__ _____    ______ ____
 / __ |/  _ \_/ ___\| __ \\__  \  /  ___// __ \
/ /_/ (  <_> )  \___| \_\ \/ __ \_\___ \\  ___/
\____ |\____/ \___  >___  (____  /____  >\___  >
     \/           \/    \/     \/     \/     \/
        generator!

...

4. cd build_html && python -m SimpleHTTPServer 1234

████████████████████
```

## Generator options

### Hosting your .md project

```
1. Where is your .md project hosted? (Use arrow keys)
❯ Magic (⊃｡•́‿•̀｡)⊃━☆ﾟ.*･｡ﾟ
  Filesystem
  Github
  External URL
```

Docbase can read markdown files from Github, filesystem, or an external URL (like bitbucket, your own servers). In addition, docbase generator provides a **magic** mode where it generates a boilerplate markdown project for you to get started, isn't that sweet!

``Note:`` When using Github as a source to read .md files, docbase asks you for a personal access token. A token with publichelps docbase to not be rate-limited by Github. Generating one is easy, you can read about it [here](https://github.com/blog/1509-personal-api-tokens).

### Publishing docbase

```
2. Where would you like to publish? (Use arrow keys)
❯ Locally
  Github pages (with travis-ci)
```

Docbase can publish locally, where you can serve the project via an HTTP server. It creates a ``build_html/`` directory which is the entire static site.

An alternative to local publishing is deploying to **gh-pages**. Docbase does this by integrating with travis-ci. This option is great for production use as travis-ci generates the docs on every commit.

### Pick your theme

```
3. Choose your primary theme color (say green, #abcdef) (firebrick)

```

Docbase is colorful. It let's you change the theme color easily - a color can have any css supported value. Some valid values are: oceanblue, red, #50ABFF, rgb(100, 150, 200).

Even beyond the colorful themes, docbase is easy to extend.


## Project Structure

Once you have the project working, this is how the directory structure would look like:

```
  |_ GruntFile.js
  |_ boilerplate_docs
  |  |_ v1
  |     |_ howtostart
  |        |_ starting.md
  |_ search-index.json
  |_ build_html
  |	  |_ v1
  |     |_ howtostart
  |        |_ starting.html
  |_ docbase-config.js
  |_ .travis.yml
  |_ .gitignore
  |_ images
  |_ index.html
  |_ html
  |_ styles
  |  |_ style.css
  |  |_ theme.css
  |_ js
  |  |_ docbase.js
  |_ package.json
  |_ bower.json
  |_ bower_components
  |_ node_modules
```

Docbase's generator creates:

* ``GruntFile.js`` - executes the task of converting .md docs to HTML.
* ``docbase-config.js`` - configuration file built based on the preferences provided in the generator.
* ``styles/theme.css`` - css style file generated based on the primary theme color.
* ``build_html/`` - output HTML site generated based on the source .md project.
* ``boilerplate_docs/`` - Docbase generated .md docs for quick start in **magic** mode, can be safely ignored.
* ``search-index.json`` - Site's search index file (generated when publishing locally).
* ``.travis.yml`` - A configuration file telling travis how to build the project. (generated when publishing to **github pages**)

For understanding the configuration options in more detail, check out the next guide on docbase config options.
