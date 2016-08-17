react-es6-redux
===============

[![Build Status](https://travis-ci.org/topheman/react-es6-redux.svg?branch=master)](https://travis-ci.org/topheman/react-es6-redux)
[![Coverage Status](https://coveralls.io/repos/github/topheman/react-es6-redux/badge.svg?branch=master)](https://coveralls.io/github/topheman/react-es6-redux?branch=master)
[![Sauce Test Status](https://saucelabs.com/buildstatus/react-es6-redux)](https://saucelabs.com/u/react-es6-redux)

![image](http://dev.topheman.com/wp-content/uploads/2015/04/logo-reactjs.png)

This project started as a POC for **React** and has now become my own sandbox for testing the latest technologies. You'll find documentation across the code, the commits and the READMEs helping you implement the following I'm using:

* [React](https://github.com/facebook/react)
* [React Router](https://github.com/reactjs/react-router)
* [Babel v6](http://babeljs.io/) to transpile ES6+
* [Webpack](http://webpack.github.io/) for bundling
* [Redux](https://github.com/reactjs/redux) for state management
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) please watch [Dan Abramov about Time Travel at React-Europe](https://www.youtube.com/watch?v=xsSnOQynTHs)
* [React Router Redux](https://github.com/reactjs/react-router-redux) Redux/React Router bindings
* [Eslint](http://eslint.org/) (with [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb))
* [style-loader](https://github.com/webpack/style-loader), [sass-loader](https://github.com/jtangelder/sass-loader)
* [babel-preset-react-hmre](https://github.com/danmartinez101/babel-preset-react-hmre) (react-hot-reload for babel v6 - thanks to [react-transform-hmr](https://github.com/gaearon/react-transform-hmr))
* [Karma](https://karma-runner.github.io) Test runner / [PhantomJS](http://phantomjs.org/) Scripted, headless browser
* [Mocha](https://mochajs.org/) / [Chai](http://chaijs.com/) / [Sinon](http://sinonjs.org/) Test framework / Assertion Library / Test spies
* [Enzyme](http://airbnb.io/enzyme/) Testing utilities for React from Airbnb
* [babel-plugin-\_\_coverage\_\_](https://github.com/dtinth/babel-plugin-__coverage__) used with [karma-coverage](https://github.com/karma-runner/karma-coverage), spits out coverage reports **directly on es6 source code**
* [karma-coveralls](https://github.com/caitp/karma-coveralls) (coverage reports in CI mode)
* [Protractor](https://angular.github.io/protractor/) (e2e tests run with [Selenium WebDriver](http://www.seleniumhq.org/) - on [SauceLabs](https://saucelabs.com/u/react-es6-redux) in CI mode)
* [nock](https://github.com/node-nock/nock) / [superagent-mocker](https://github.com/A/superagent-mocker) to record & mock http requests

The **development / build / deploy workflow** is based on [topheman/webpack-babel-starter](https://github.com/topheman/webpack-babel-starter), which allows to have online both:

* [production version](https://topheman.github.io/react-es6-redux/) (minified js/css ...)
* [development version](https://topheman.github.io/react-es6-redux/devtools/) (with sourcemaps, so that users could see the original es6 source code, even online, just by opening the sources panel in the devtools console)

**Support for [Travis CI](https://travis-ci.org/topheman/react-es6-redux)** (see [.travis.yml](https://github.com/topheman/react-es6-redux/blob/master/.travis.yml) file):

* builds are tested
* source code is linted
* unit tests are run
* code coverage is sent to [coveralls.io](https://coveralls.io/github/topheman/react-es6-redux)
* e2e tests are run through [SauceLabs](https://saucelabs.com/u/react-es6-redux) (a cross-browser automation tool built on top of Selenium WebDriver)

**Previous versions** (checkout the [releases sections](https://github.com/topheman/react-es6-redux/releases)):

* The version without redux remains on the [v1.x branch](https://github.com/topheman/react-es6-redux/tree/v1.x).
* The version in babel v5 remains on the [v2.x branch](https://github.com/topheman/react-es6-redux/tree/v2.x)
* You can see the isomorphic (universal if you will) version (with server-side rendering) at [topheman/react-es6-isomorphic](https://github.com/topheman/react-es6-isomorphic/) (based on v1 - not yet with redux at this time).

To **read further** about this project and its evolution:

* [Read the WIKI](https://github.com/topheman/react-es6-redux/wiki)
* [Blog post about the upgrade to react v0.14](http://dev.topheman.com/upgraded-to-react-v0-14/)
* [Blog post about the original version](http://dev.topheman.com/playing-with-es6-and-react/)
* [Slides of the ReactJsParis meetup about this project (nov 2015)](http://slides.com/topheman/react-es6-redux)
* [Slides of the ParisJS meetup about this project (jan 2016)](https://topheman.github.io/talks/react-es6-redux/)
* [Blog post about ES6+ code coverage with Babel plugin](http://dev.topheman.com/es6-code-coverage-with-babel-plugin)

**[ONLINE DEMO](https://topheman.github.io/react-es6-redux/)**

###Setup

This project now follows the same development workflow as the one explained in [topheman/webpack-babel-starter](https://github.com/topheman/webpack-babel-starter) (with some additions, specific to the project).

####Install

```shell
git clone https://github.com/topheman/react-es6-redux.git
cd react-es6-redux
npm install
```

*Note:* Installing the [topheman-apis-proxy](#with-topheman-apis-proxy) backend is **no longer mandatory** (I changed the code so that you could do unauthenticated request to the github API - you will be [rate limited to 10 requests per minute](https://developer.github.com/v3/search/#rate-limit) though).

####Run

#####Dev mode

* `npm start`
* Open [http://localhost:8080/](http://localhost:8080/)

You're good to go with hot-reload / redux-devtools / time-travel / sourcemaps ...!

#####Mock mode

You can also run the app in mock mode (useful for tests):

* `npm run webpack-mock`
* Open [http://localhost:8080/](http://localhost:8080/)


####Build

At the root of the project :

* `npm run build`: for debug (like in dev - with sourceMaps and all)
* `npm run build-prod`: for production (minified/optimized ...)
* `npm run build-prod-all`: both at once in the same build (with redux devtools & sourcemaps on dev version)

A `/build/dist` folder will be created with your project built in it.

You can run it with `npm run serve-build`

####Test

#####Unit tests

`npm test` will launch:

* linting of `/src` & `/test` folders via `eslint`
* the unit-tests files are located in `/src` inside `__tests__` folders, named like `*.spec.js`
* those tests files are run by karma

This task is launched on `pre-commit` hook & on [Travis CI](https://travis-ci.org/topheman/react-es6-redux).

If you wish to generate coverage reports, just `npm run karma-coverage` (those reports are generated on Travis CI anyway and available on [coveralls.io](https://coveralls.io/github/topheman/react-es6-redux)), you will find them in local at `/build/reports/coverage`.

*Note:* Unit-tests are run through karma in PhantomJS (the `webpack.config.js` being injected), they can also be run directly via mocha ([see wiki](https://github.com/topheman/react-es6-redux/wiki/Advanced-tasks#test-tasks)).

#####End to end tests

e2e tests are located in `/test/e2e/spec`.

Open two terminal tabs, on each one:

* `npm run webpack-mock`: will launch the project in mock mode
* `npm run test-e2e`: will run the e2e tests in `/test/e2e` via `protractor` against your local server

Those tests are run on Travis CI, via [SauceLabs](https://saucelabs.com/u/react-es6-redux).

####Linter

I'm using eslint, based on [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), a preset for `.eslintrc` configuration. For more infos, checkout the release it was implemented: [v2.5.0](https://github.com/topheman/react-es6-redux/releases/tag/v2.5.0).

* `npm run lint`: single run linting of `/src` & `/test` folders
* `npm run lint-watch`: same in watch mode

####Specific commands

You may want some granularity, the `DEVTOOLS`, `SHOW_DEVTOOLS`, `NODE_ENV` & `LINTER` variables are at your disposal:

* `DEVTOOLS=true npm run build`: will build a debug version with the devtools
* `DEVTOOLS=false npm run webpack`: will launch a webpack dev server without the devtools (if you find it annoying)
* `LINTER=false npm start` (if you don't want to be bothered by the linter - at your own risks! the pre-commit hook will run the linter and the tests anyway)
* `SHOW_DEVTOOLS=false npm start` (if you want to hide the redux-devtools - you'll still be able to show them by `ctrl+H`)
* `DASHBOARD=true npm start`: will use [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard) in dev-server mode
* ... you can mix and match ;-)

**Read the ["Advanced tasks" wiki section](https://github.com/topheman/react-es6-redux/wiki/Advanced-tasks) for more infos ...**

####With topheman-apis-proxy

**This part is optional**

[topheman-apis-proxy](https://github.com/topheman/topheman-apis-proxy) is a proxy that lets you do authenticated requests to github / twitter APIs (that way you have a much higher rate limit). For the install, please follow the [installation steps](https://github.com/topheman/topheman-apis-proxy#installation) README section.

Then your workflow will be:

* Open a terminal in the react-es6-redux folder and `npm run webpack-dev`
* Open a terminal in the topheman-apis-proxy folder and `grunt serve` (see more in the [run in local](https://github.com/topheman/topheman-apis-proxy#run-in-local) README section)
* Go to [http://localhost:8080/](http://localhost:8080/)

###Deploy

I'm using github pages for hosting (free https, easy deploy via git - a good deal since I don't need any server-side logic). You'll find a [gh-pages orphan branch](https://github.com/topheman/react-es6-redux/tree/gh-pages) where the deployed builds are stored.

My deployment routine is described on the [topheman/webpack-babel-starter Wiki](https://github.com/topheman/webpack-babel-starter/wiki).

###Notes

* `build-prod-all-owner`: build task for [topheman.github.io/react-es6-redux](https://topheman.github.io/react-es6-redux/)

###License

This software is distributed under an MIT licence.

Copyright 2015-2016 © Christophe Rosset

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software
> and associated documentation files (the "Software"), to deal in the Software without
> restriction, including without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
> Software is furnished to do so, subject to the following conditions:
> The above copyright notice and this permission notice shall be included in all copies or
> substantial portions of the Software.
> The Software is provided "as is", without warranty of any kind, express or implied, including
> but not limited to the warranties of merchantability, fitness for a particular purpose and
> noninfringement. In no event shall the authors or copyright holders be liable for any claim,
> damages or other liability, whether in an action of contract, tort or otherwise, arising from,
> out of or in connection with the software or the use or other dealings in the Software.