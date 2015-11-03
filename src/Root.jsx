'use strict';

import React from 'react';

import routes from './routes.jsx';

import configureStore from './utils/configure-store.js';

import { ReduxRouter } from 'redux-router';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const initialState = {
  counter: 0
};

/**
 * The whole store/reducers/actions configuration is done here
 * The configuration of the router is also done their since it's stored in redux store (using a specific reducer)
 */
export const store = configureStore(initialState);

function getDebugPanel(){
  if(__DEVTOOLS__){
    console.info('redux devtools active, to hide the panel : ctrl+H');
    console.info('for more infos', 'https://github.com/gaearon/redux-devtools');
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
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
