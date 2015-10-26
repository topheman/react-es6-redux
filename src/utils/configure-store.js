/* global __DEVTOOLS__ */

//inspired by https://github.com/emmenko/redux-react-router-async-example

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { reduxReactRouter, routerStateReducer } from 'redux-router';
import createHashHistory from 'history/lib/createHashHistory';
import thunk from 'redux-thunk';
import logger from '../middleware/logger';
import * as reducers from '../reducers';

import { devTools } from 'redux-devtools';

// Don't use queryKey when HMR is on
// @todo setup the without hash for the other project
const createHistory = () => {
  return createHashHistory({queryKey: module.hot ? true : false});
};

let combinedCreateStore;
const storeEnhancers = [
  reduxReactRouter({ createHistory })
];

if (__DEVTOOLS__) {
  storeEnhancers.push(devTools());
}

combinedCreateStore = compose(...storeEnhancers)(createStore)
const finalCreateStore = applyMiddleware(thunk, logger)(combinedCreateStore)
const combinedReducer = combineReducers(Object.assign({
  router: routerStateReducer
}, reducers))

export default function configureStore (initialState) {

  const store = finalCreateStore(combinedReducer, initialState)

  if (module.hot)
  // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      console.log('reloading reducer');
      const nextRootReducer = require('../reducers/index')
      store.replaceReducer(nextRootReducer)
    });

  return store;
}