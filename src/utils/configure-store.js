/* global __DEVTOOLS__ */

/**
 * inspired by https://github.com/emmenko/redux-react-router-async-example
 *
 * I added some comments to help understand the code
 */

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

/**
 * https://github.com/rackt/redux/blob/master/docs/Glossary.md#store-enhancer
 * A store enhancer is a higher-order function that composes a store creator to return a new, enhanced store creator.
 * Signature : (StoreCreator) => (StoreCreator)
 */
const storeEnhancers = [
  reduxReactRouter({ createHistory })
];
if (__DEVTOOLS__) {
  storeEnhancers.push(devTools());
}

/**
 * storeEnhancers contained in the array are composed in one which alters the original createStore function from redux
 */
combinedCreateStore = compose(...storeEnhancers)(createStore)

/**
 * The applyMiddleware allows us to add the following middlewares to the previously altered version of createStore.
 * The redux middlewares have the signature : ({ getState, dispatch }) => next => action
 */
const finalCreateStore = applyMiddleware(thunk, logger)(combinedCreateStore)

/**
 * http://redux.js.org/docs/api/combineReducers.html
 * The combineReducers helper function turns an object whose values are different
 * reducing functions into a single reducing function you can pass to createStore.
 *
 * Returns one reducer function calling all the other. Signature :  (state, action) => state
 */
const combinedReducer = combineReducers(Object.assign({
  router: routerStateReducer
}, reducers))

export default function configureStore (initialState) {

  /**
   * The store can finally be created based on our combinedReducer and finalCreateStore function as we would have done
   * createStore(reducers)
   * but with composed versions of each ones, thanks to functional programming
   */
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