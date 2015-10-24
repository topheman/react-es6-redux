'use strict';

import React from 'react';
import { createHashHistory } from 'history';

import routes from './routes.jsx';

import { createStore, compose, combineReducers } from 'redux';
import { ReduxRouter, routerStateReducer, reduxReactRouter } from 'redux-router';
import { Provider } from 'react-redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const reducer = combineReducers({
  router: routerStateReducer
});

const store = compose(
  reduxReactRouter({
    createHistory: () => {
      return createHashHistory({queryKey:false});
  } }),
  devTools()
)(createStore)(reducer);

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>
            {routes}
          </ReduxRouter>
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
};
