'use strict';

import React from 'react';

import routes from './routes.jsx';

import configureStore from './utils/configure-store.js';

import { createStore, compose, combineReducers } from 'redux';
import { ReduxRouter, routerStateReducer, reduxReactRouter } from 'redux-router';
import { Provider, connect } from 'react-redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const initialState = {
  counter: 0
};

export const store = configureStore(initialState);

function getDebugPanel(){
  if(__DEVTOOLS__){
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
