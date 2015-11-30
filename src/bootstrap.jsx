global.Promise = global.Promise || require('es6-promise').Promise;

import React from 'react';
import ReactDOM from 'react-dom';

import { ReduxRouter } from 'redux-router';
import { Provider } from 'react-redux';

import routes from './routes.jsx';

import configureStore from './redux/configure-store.js';

//init httpService config
import httpServiceConfiguration from 'httpServiceConfiguration';
import httpService from './services/httpService.js';
httpService.getInstance(httpServiceConfiguration);//will keep config in singleton
//this way, instead of using resolve.alias of webpack (and having the require of module messed up by webpack when they'll be executed server-side)
//I use dependency injection, in the one place that won't be executed in node : the client side bootstrap

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
 * Thanks to webpack.DefinePlugin which lets you inject variables at transpile time,
 * everything inside the if statement will be dropped at minification if process.env.DEVTOOLS is set to false.
 * This is why I don't use static ES6 import but CommonJS import (so that it will only get required in that particular case)
 *
 * Cause: since the following are debug tools, they are not meant to be a part of the production bundle (which makes it lighter)
 *
 * https://webpack.github.io/docs/list-of-plugins.html#defineplugin
 */
if(process.env.DEVTOOLS){
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
  console.info('redux devtools not active, you can test them online at','https://topheman.github.io/react-es6-redux/devtools.html');
  console.info('if you\'re testing the project in local, please refer to the README to activate them');
  rootElement = (
    <Provider store={store}>
      {component}
    </Provider>
  )
}

ReactDOM.render(rootElement, document.getElementById('app-container'))
