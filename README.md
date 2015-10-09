react-es6
=========

![image](http://dev.topheman.com/wp-content/uploads/2015/04/logo-reactjs.png)

*UPDATE*: Facebook released [react@0.14.0](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html), this project is now up to date with the new version of react. See the wiki for [more infos about the upgrade](https://github.com/topheman/react-es6/wiki).

This project is a POC based on React framework, coded in ES6, relying on [topheman-apis-proxy](https://github.com/topheman/topheman-apis-proxy) as a backend (providing the github API).

This repo holds the front-only part. You can see the isomorphic (universal if you will) version (with server-side rendering) at [topheman/react-es6-isomorphic](https://github.com/topheman/react-es6-isomorphic/).

The main constraint was to produce code that could be reused for server-side rendering.

If you want to go further, read the [blog post](http://dev.topheman.com/playing-with-es6-and-react/) about this project.

###Basic features :

* `/` : Home page : Display a short description of the project with a try button to :
* `/github` : Provide a search form that displays a list of github users (with their avatars) - a request to the Github API is made.
* `/github/user/:username` : Display a user profile with his repositories, with pagination.

###Setup

####Install

The react-es6 part :

`npm install grunt-cli -g` (if you don't have it)

```shell
git clone https://github.com/topheman/react-es6.git
cd react-es6
npm install
```

You'll have to install the [topheman-apis-proxy](https://github.com/topheman/topheman-apis-proxy) backend, follow the [installation steps](https://github.com/topheman/topheman-apis-proxy#installation) README section.

####Run

* Open a terminal in the react-es6 folder and `npm run dev`
* Open a terminal in the topheman-apis-proxy folder and `grunt serve` (see more in the [run in local](https://github.com/topheman/topheman-apis-proxy#run-in-local) README section)
* Go to [http://localhost:8080/](http://localhost:8080/)

You can also run the app in mock mode (without any backend - the http request are mocked), usefull for :

* working offline
* create unit tests without changing code
 
Just run : `npm run dev-mock`


####Build

At the root of the project :

* for production (minified/optimized ...) : `npm run build-prod`
* for debug (like in dev - with sourceMaps and all) : `npm run build`

A `/build` folder will be created with your project built in it.

You can run it with `grunt serve:build`

###Steps :

Checkout the [releases sections](https://github.com/topheman/react-es6/releases).

If I got time, some implementations would be worth it on projects on the side :

* Extract the http / Github isomorphic network layer to a node module, so that it could be used in standalone.
* Implement a localstorage cache middleware for superagent.
* [Add Flux to manage states](https://github.com/topheman/react-es6/issues/2) (choose an implementation)

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