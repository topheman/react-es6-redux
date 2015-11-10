'use strict';

import React from 'react';

import routes from './routes.jsx';

import configureStore from './utils/configure-store.js';

import { ReduxRouter } from 'redux-router';
import { Provider } from 'react-redux';

const initialState = {
  counter: 0
};

/**
 * The whole store/reducers/actions configuration is done here
 * The configuration of the router is also done their since it's stored in redux store (using a specific reducer)
 */
export const store = configureStore(initialState);

/**
 * Thanks to webpack.DefinePlugin which lets you inject variables at transpile time,
 * everything inside the if statement will be dropped at minification if __DEVTOOLS__ is set to false.
 * This is why I don't use static ES6 import but CommonJS import (so that it will only get required in that particular case)
 *
 * Cause: since the following are debug tools, they are not meant to be a part of the production bundle (which makes it lighter)
 *
 * https://webpack.github.io/docs/list-of-plugins.html#defineplugin
 */
function getDebugPanel(){
  if(__DEVTOOLS__){
    console.info('redux devtools active, to hide the panel : ctrl+H - for more infos', 'https://github.com/gaearon/redux-devtools');
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }
  else{
    console.info('redux devtools not active, you can test them online at','https://topheman.github.io/react-es6-redux/devtools.html');
    console.info('if you\'re testing the project in local, please refer to the README to activate them');
  }
  return(<div/>);
}

var ReduxDebugPanel = getDebugPanel();

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>
            {routes}
          </ReduxRouter>
        </Provider>
        {ReduxDebugPanel}
      </div>
    );
  }
};
