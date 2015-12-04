react-es6-redux
===============

[![Build Status](https://travis-ci.org/topheman/react-es6-redux.svg?branch=master)](https://travis-ci.org/topheman/react-es6-redux)

![image](http://dev.topheman.com/wp-content/uploads/2015/04/logo-reactjs.png)

This project is a POC based on **React** framework, coded in **ES6+**, relying on [topheman-apis-proxy](https://github.com/topheman/topheman-apis-proxy) as a backend (providing the github API) and using **redux** for state management.

This repo holds the front-only part.

* The version without redux remains on the [v1.x branch](https://github.com/topheman/react-es6-redux/tree/v1.x).
* You can see the isomorphic (universal if you will) version (with server-side rendering) at [topheman/react-es6-isomorphic](https://github.com/topheman/react-es6-isomorphic/) (based on v1 - not yet with redux at this time).

To read further about this project and its evolution:

* [Blog post about the original version](http://dev.topheman.com/playing-with-es6-and-react/)
* [Blog post about the upgrade to react v0.14](http://dev.topheman.com/upgraded-to-react-v0-14/)
* [The slides on the talk I made at the ReactJsParis meetup about this project](http://slides.com/topheman/react-es6-redux)

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

* `npm run webpack-dev-simple`
* Open [http://localhost:8080/](http://localhost:8080/)

You're good to go with hot-reload / redux-devtools / time-travel / sourcemaps ...!

#####Mock mode

You can also run the app in mock mode (useful for unit-tests):

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

```shell
npm test
```

This will launch:

* linting of `/src` & `/test` folders via `eslint`
* the unit-tests in `/test` folder via `mocha`

This task is launched on `pre-commit` hook.

####Linter

I'm using eslint, based on [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), a preset for `.eslintrc` configuration. For more infos, checkout the release it was implemented: [v2.5.0](https://github.com/topheman/react-es6-redux/releases/tag/v2.5.0).

* `npm run lint`: single run linting of `/src` & `/test` folders
* `npm run lint-watch`: same in watch mode


####Specific commands

You may want some granularity, the `DEVTOOLS`, `NODE_ENV` & `DISABLE_LINTER` variables are at your disposal:

* `DEVTOOLS=true npm run build`: will build a debug version with the devtools
* `DEVTOOLS=false npm run webpack`: will launch a webpack dev server without the devtools (if you find it annoying)
* `DEVTOOLS=false NODE_ENV=MOCK npm run webpack` will launch a webpack dev server in mock mode without the devtools
* `DISABLE_LINTER=true npm run webpack-dev-simple` (if you don't want to be bothered by the linter - at your own risks! the pre-commit hook will run the linter and the tests anyway)
* ... you can mix and match ;-)

####With topheman-apis-proxy

**This part is optional**

[topheman-apis-proxy](https://github.com/topheman/topheman-apis-proxy) is a proxy that lets you do authenticated requests to github / twitter APIs (that way you have a much higher rate limit). For the install, please follow the [installation steps](https://github.com/topheman/topheman-apis-proxy#installation) README section.

Then your workflow will be:

* Open a terminal in the react-es6-redux folder and `npm run webpack-dev`
* Open a terminal in the topheman-apis-proxy folder and `grunt serve` (see more in the [run in local](https://github.com/topheman/topheman-apis-proxy#run-in-local) README section)
* Go to [http://localhost:8080/](http://localhost:8080/)

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