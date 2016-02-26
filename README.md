react-es6-redux
===============

[![Build Status](https://travis-ci.org/topheman/react-es6-redux.svg?branch=master)](https://travis-ci.org/topheman/react-es6-redux)
[![Sauce Test Status](https://saucelabs.com/buildstatus/react-es6-redux)](https://saucelabs.com/u/react-es6-redux)

![image](http://dev.topheman.com/wp-content/uploads/2015/04/logo-reactjs.png)

This project is a POC based on **React** framework, coded in **ES6+**, relying on [topheman-apis-proxy](https://github.com/topheman/topheman-apis-proxy) as a backend (providing the github API) and using **redux** for state management.

It also has **Continuous Integration support** via [Travis CI](https://travis-ci.org/topheman/react-es6-redux), with **unit tests** as well as **e2e tests** (through [SauceLabs](https://saucelabs.com/u/react-es6-redux)).

This repo holds the front-only part.

* The version without redux remains on the [v1.x branch](https://github.com/topheman/react-es6-redux/tree/v1.x).
* You can see the isomorphic (universal if you will) version (with server-side rendering) at [topheman/react-es6-isomorphic](https://github.com/topheman/react-es6-isomorphic/) (based on v1 - not yet with redux at this time).

To read further about this project and its evolution:

* [Read the WIKI](https://github.com/topheman/react-es6-redux/wiki)
* [Blog post about the upgrade to react v0.14](http://dev.topheman.com/upgraded-to-react-v0-14/)
* [Blog post about the original version](http://dev.topheman.com/playing-with-es6-and-react/)
* [Slides of the ReactJsParis meetup about this project (nov 2015)](http://slides.com/topheman/react-es6-redux)
* [Slides of the ParisJS meetup about this project (jan 2016)](https://topheman.github.io/talks/react-es6-redux/)

###Basic features :

* `/` : Home page : Displays a short description of the project with a try button to :
* `/github` : Provides a search form that displays a list of github users (with their avatars) - a request to the Github API is made.
* `/github/user/:username` : Displays a user profile with his repositories, with pagination.

All state management is done via redux. In development mode, you have access to the [redux-devtools](https://github.com/gaearon/redux-devtools) (you can also [test them on the online version](https://topheman.github.io/react-es6-redux/devtools.html)).

* react-router connected to redux-stores
* hot reload everything!
* redux-devtools

###Setup

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

A `/build` folder will be created with your project built in it.

You can run it with `npm run serve-build`

####Test

#####Unit tests

`npm test` will launch:

* linting of `/src` & `/test` folders via `eslint`
* the unit-tests in `/test/unit` folder via `mocha`

This task is launched on `pre-commit` hook & on Travis CI.

*Note: There aren't much unit tests currently, this part is still in progress.*

#####End to end tests

Open two terminal tabs, on each one:

* `npm run webpack-mock`: will launch the project in mock mode
* `npm run test-e2e`: will run the e2e tests in `/test/e2e` via `protractor` against your local server

Those tests are run on Travis CI, via SauceLabs. For more infos about that, see the [Continuous Integration section](#continuous-integration).

####Linter

I'm using eslint, based on [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), a preset for `.eslintrc` configuration. For more infos, checkout the release it was implemented: [v2.5.0](https://github.com/topheman/react-es6-redux/releases/tag/v2.5.0).

* `npm run lint`: single run linting of `/src` & `/test` folders
* `npm run lint-watch`: same in watch mode

####Specific commands

You may want some granularity, the `DEVTOOLS`, `NODE_ENV` & `LINTER` variables are at your disposal:

* `DEVTOOLS=true npm run build`: will build a debug version with the devtools
* `DEVTOOLS=false npm run webpack`: will launch a webpack dev server without the devtools (if you find it annoying)
* `DEVTOOLS=false NODE_ENV=MOCK npm run webpack` will launch a webpack dev server in mock mode without the devtools
* `LINTER=false npm start` (if you don't want to be bothered by the linter - at your own risks! the pre-commit hook will run the linter and the tests anyway)
* ... you can mix and match ;-)

**Read the ["Advanced tasks" wiki section](https://github.com/topheman/react-es6-redux/wiki/Advanced-tasks) for more infos ...**

####With topheman-apis-proxy

**This part is optional**

[topheman-apis-proxy](https://github.com/topheman/topheman-apis-proxy) is a proxy that lets you do authenticated requests to github / twitter APIs (that way you have a much higher rate limit). For the install, please follow the [installation steps](https://github.com/topheman/topheman-apis-proxy#installation) README section.

Then your workflow will be:

* Open a terminal in the react-es6-redux folder and `npm run webpack-dev`
* Open a terminal in the topheman-apis-proxy folder and `grunt serve` (see more in the [run in local](https://github.com/topheman/topheman-apis-proxy#run-in-local) README section)
* Go to [http://localhost:8080/](http://localhost:8080/)

###Continuous Integration

The CI configuration is highly inpired by my previous project [topheman/vanilla-es6-jspm](https://github.com/topheman/vanilla-es6-jspm). On each push, Travis CI will run the tests specified in the [.travis.yml](https://github.com/topheman/react-es6-redux/blob/master/.travis.yml) file, which is mostly:

* checking if the build task for production works
* linting source code
* running unit tests
* running e2e tests against a built mock version of the site (this part is using [SauceLabs](https://saucelabs.com/buildstatus/react-es6-redux), a cross-browser automation tool built on top of Selenium WebDriver)

###Steps

Checkout the [releases sections](https://github.com/topheman/react-es6-redux/releases).

You'll see the releases for both versions:

* original one (redux free) which is hold on [v1.x branch](https://github.com/topheman/react-es6-redux/tree/v1.x)
* the version with the redux implementation which is on [master branch](https://github.com/topheman/react-es6-redux)

###Notes

* `build-prod-all-owner`: build task for [topheman.github.io/react-es6-redux](https://topheman.github.io/react-es6-redux)

###License

This software is distributed under an MIT licence.

Copyright 2015 © Christophe Rosset

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