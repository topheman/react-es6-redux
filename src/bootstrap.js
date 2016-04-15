global.Promise = global.Promise || require('es6-promise').Promise;

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import routes from './routes.js';

import configureStore from './redux/configure-store.js';

// init httpService
import httpService from './services/httpService.js';
httpService.getInstance();

const initialState = {};

/**
 * The whole store/reducers/actions creators configuration is done inside configureStore
 */
const store = configureStore(initialState);

/**
 * Router initialization
 * API has changed since react-router-redux v4 - checkout this commit for migration v3 -> v4: https://github.com/davezuko/react-redux-starter-kit/commit/0df26907
 */
const syncedHistory = syncHistoryWithStore(hashHistory, store);

const component = (
  <Router history={syncedHistory}>
    {routes}
  </Router>
);

/**
 * The linter can be disabled via DISABLE_LINTER env var - show a message in console to inform if it's on or off
 * Won't show in production
 */
if (process.env.NODE_ENV !== 'production') {
  if (!process.env.LINTER) {
    console.warn('Linter disabled, make sure to run your code against the linter, otherwise, if it fails, your commit will be rejected');
  }
  else {
    console.info('Linter active, if you meet some problems, you can still run without linter :', 'set the env var LINTER=false', 'More infos in the README');
  }
}

let rootElement = null;

/**
 * Thanks to webpack.DefinePlugin which lets you inject variables at transpile time,
 * everything inside the if statement will be dropped at minification if process.env.DEVTOOLS is set to false.
 * This is why I don't use static ES6 import but CommonJS import (so that it will only get required in that particular case)
 *
 * Cause: since the following are debug tools, they are not meant to be a part of the production bundle (which makes it lighter)
 *
 * https://webpack.github.io/docs/list-of-plugins.html#defineplugin
 */
if (process.env.DEVTOOLS) {
  console.info('redux devtools active, to hide the panel: ctrl+H, to change position: ctrl+Q - for more infos', 'https://github.com/gaearon/redux-devtools');
  const DevTools = require('./redux/DevTools');
  rootElement = (
    <Provider store={store}>
      <div>
        {component}
        <DevTools/>
      </div>
    </Provider>
  );
}
else {
  console.info('redux devtools not active, you can test them online at', 'https://topheman.github.io/react-es6-redux/devtools/');
  console.info('if you\'re testing the project in local, please refer to the README to activate them');
  rootElement = (
    <Provider store={store}>
      {component}
    </Provider>
  );
}

if (process.env.NODE_ENV === 'mock') {
  console.info('MOCK mode');
}

ReactDOM.render(rootElement, document.getElementById('app-container'));
