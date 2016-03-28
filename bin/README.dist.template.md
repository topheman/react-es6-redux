##react-es6-redux - distribution version (gh-pages branch)

This is the distribution version of [topheman/react-es6-redux](https://github.com/topheman/react-es6-redux) - v<%= pkg.version %><% if (urlToCommit !== null) { %> - [#<%= gitRevisionShort %>](<%= urlToCommit %>)<% } %>.

**Warning**: This is the **generated** code, versionned on the `gh-pages` branch, testable online [here](https://topheman.github.io/react-es6-redux/). If you wish to see the original source code, switch to the [master branch](https://github.com/topheman/react-es6-redux).

###Infos:

Those informations are available on the [topheman/webpack-babel-starter](https://github.com/topheman/webpack-babel-starter) project:

* [How those files were generated (Readme - build section)](https://github.com/topheman/webpack-babel-starter#build)
* [How to deploy your generated version (Wiki - deploy section)](https://github.com/topheman/webpack-babel-starter/wiki#deploy)

As explained in the [README](https://github.com/topheman/react-es6-redux#build), when you `npm run build-prod-all`, two versions will be generated:

* One at the root (the production version)
* One in the [devtools folder](https://github.com/topheman/react-es6-redux/tree/gh-pages/devtools), which contains as you'll see sourcemaps and are not minified.

Test the demo [here](https://topheman.github.io/react-es6-redux/).

------

You can disable the generation of this file by removing the following line in the `package.json`:

```js
"postbuild-prod-all": "npm run generate-dist-readme"
```

You can customize the output of this file, the template is located at `bin/README.dist.template.md`.
