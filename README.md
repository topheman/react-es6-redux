react-es6
=========

This project is a POC with the following constraints :

* Use React
* Use ES6

The end goal is to do an isomorphic app with React, so this project is a sandbox to play with React and ES6 and will lay the foundations for my next project :

* Do an isomorphic app
* Same router on frontend and backend with multiple routes
* Unit tests

###No constraints on :

* Application features (simple app, must only use data from a remote server)
	* The remote server will be an instance of [topheman-apis-proxy](https://github.com/topheman/topheman-apis-proxy) (there will be work on this side to provide offline mock data for unit tests)
* Module bundler / Task runner / Transpiler

###Steps :

Here are the following steps I intend to follow (may change) - should be tagged when stable to keep track of evolution :

- [x] Setup transpiler to use ES6 (babel via webpack were selected)
- [x] Setup simpliest React component (make sure jsx and ES6 transpiling works)
- [x] Add sass / bootstrap support via webpack (to have the same kinds of constraints as a regular app) [v0.2.0](https://github.com/topheman/react-es6/tree/v0.2.0)
- [x] Manage build [v0.3.0](https://github.com/topheman/react-es6/tree/v0.3.0) : 
	- [x] copy assets from `src`to `build` with grunt
	- [x] run the `webpack` build with npm
	- [x] launch the whole with `npm run build` or `npm run build-prod`
- [x] Add React.Router [v0.4.0](https://github.com/topheman/react-es6/tree/v0.4.0)
- [x] HTML 5 history API support to router with `Router.HistoryLocation` [v0.4.1](https://github.com/topheman/react-es6/tree/v0.4.1) (removed since can't have .htaccess or server-side code on github pages that does a "catch all" to redirect to index.html)
- [x] First part of the App : Github user search [v0.5.0](https://github.com/topheman/react-es6/tree/v0.5.0)
- [x] Second part of the App : Display a full Github User profile according to the username given in the route [v0.6.0](https://github.com/topheman/react-es6/tree/v0.6.0)
	- [x] Network layer module now :
		- [x] uses ES6 Promise
		- [x] has a mock version
		- [x] returns metadata such as pagination information
	- [x] Component displaying Github user full profile
	- [x] Component displaying Github user repositories, with pagination
- [x] Refactor components using some React hooks like `componentWillMount` [v0.6.1](https://github.com/topheman/react-es6/tree/v0.6.1)
	- [x] UI : spinner on repositories pagination
- [x] Get rid of webpack resolve.alias on httpService in favor of depencency injection (would have messed up the `require` of node - or forced to find hack to require modules in node through webpack)[v0.6.2](https://github.com/topheman/react-es6/tree/v0.6.2)
- [ ] Add Flux to manage states (choose an implementation)
- [ ] ...

If I got time, some implementations would be worth it on projects on the side :

* Extract the http / Github isomorphic network layer to a node module, so that it could be used in standalone.
* Implement a localstorage cache middleware for superagent.


###Basic features :

May change

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

####Build

At the root of the project :

* for production (minified/optimized ...) : `npm run build-prod`
* for debug (like in dev - with sourceMaps and all) : `npm run build`

A `/build` folder will be created with your project built in it.

You can run it with `grunt serve:build`
