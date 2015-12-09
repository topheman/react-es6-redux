global.Promise = global.Promise || require('es6-promise').Promise;

import React from 'react';
import ReactDOM from 'react-dom';

import { ReduxRouter } from 'redux-router';
import { Provider } from 'react-redux';

import routes from './routes.js';

import configureStore from './redux/configure-store.js';

// init httpService
import httpService from './services/httpService.js';
httpService.getInstance();

/** Redux initialization */

const component = (
  <ReduxRouter>
    {routes}
  </ReduxRouter>
);

const initialState = {};

/**
 * The whole store/reducers/actions creators configuration is done inside configureStore
 * The configuration of the router is also done their since it's stored in redux store (using a specific reducer)
 */
const store = configureStore(initialState);

let rootElement = null;

/**
 * The linter can be disabled via DISABLE_LINTER env var - show a message in console to inform if it's on or off
 * Won't show in production
 */
if (process.env.NODE_ENV !== 'production') {
  if (process.env.DISABLE_LINTER) {
    console.warn('Linter disabled, make sure to run your code against the linter, otherwise, if it fails, your commit will be rejected');
  }
  else {
    console.info('Linter active, if you meet some problems, you can still run without linter :', 'npm run webpack-dev-simple-nolint or npm run webpack-dev-nolint', 'More infos in the README');
  }
}

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
  console.info('redux devtools active, to hide the panel : ctrl+H - for more infos', 'https://github.com/gaearon/redux-devtools');
  const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
  rootElement = (
    <Provider store={store}>
      <div>
        {component}
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    </Provider>
  );
}
else {
  console.info('redux devtools not active, you can test them online at', 'https://topheman.github.io/react-es6-redux/devtools.html');
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
