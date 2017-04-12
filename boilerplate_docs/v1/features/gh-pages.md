{"bigh3": true}

# Github Pages

[Docbase](https://github.com/appbaseio/Docbase) turns a .md project hosted on github or locally into a beautiful site that can be deployed to github or locally.

A key feature of docbase is that it can publish directly to github pages. If you are using docbase with the yeoman generator, ``yo docbase`` should guide you with the steps to publish to Github.

This section explains how the ``gh-pages`` deployment works.

## Deploying to gh-pages

### yo docbase

Pick the github pages option in the docbase generator.

```
2. Where would you like to publish? (Use arrow keys)
   Locally
❯  Github pages (with travis-ci)
```

The key difference in publishing to github pages is that while docbase generates the config files necessary to build, it doesn't actually do the work of transforming markdown files into a site.

When publishing to github pages, docbase asks for a github username and repository name for publishing the generated site.

### Travis

Docbase uses Travis for deploying to gh-pages. Travis is a popular continuous integration tool that's free to use for all public github repositories.


![linking a repo](https://i.imgur.com/A32BKnC.png)

Linking your github repository to travis is as simple as going to [https://travis-ci.org/profile](https://travis-ci.org/profile) and turning the switch on to link it with Travis.

### git push

Once you link the repository to travis, travis will build every time there is a new push to the github repository.

Once you push, you can check the live build status at [https://travis-ci.org/user/repo/builds](https://travis-ci.org/user/repo/builds). If you see the building succeeding (which it should!), your beautiful docbase site is live at [https://user.github.io/repo/](https://user.github.io/repo/).

Going forward, every time there is a ``git push`` action against this repository, travis will create a fresh build and push to the ``gh-pages`` branch.
