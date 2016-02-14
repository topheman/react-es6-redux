/**
 * inspired by https://github.com/emmenko/redux-react-router-async-example
 *
 * I added some comments to help understand the code
 */

import { hashHistory } from 'react-router';// using the same as the one in bootstrap.js @todo find a way to inject it ?
import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistory } from 'react-router-redux';

import clientMiddleware from './middleware/clientMiddleware';

/**
 * react-redux-router middleware setup
 */
const reduxRouterMiddleware = syncHistory(hashHistory);

/**
 * https://github.com/rackt/redux/blob/master/docs/Glossary.md#store-enhancer
 * Higher order function that compose a store creator and returns a new one: (StoreCreator) => (StoreCreator)
 */
const storeEnhancers = [];

/**
 * Only require then add devtools to the store-enhancer when needed
 */
if (process.env.DEVTOOLS) {
  const DevTools = require('./DevTools');
  storeEnhancers.push(DevTools.instrument());
}

/**
 * Compose the store-enhancers with the original createStore function to create a new composed one.
 * Same as: combinedCreateStore = storeEnhancers[0](storeEnhancers[1](createStore))
 */
const combinedCreateStore = compose(...storeEnhancers)(createStore);

const middlewares = [clientMiddleware, reduxRouterMiddleware];

if (process.env.DEVTOOLS) {
  middlewares.push(require('./middleware/logger'));
}

/**
 * Compose the middlewares with the previously composed createStore function
 *
 * The applyMiddleware allows us to add the following middlewares to the previously altered version of createStore.
 * The redux middlewares have the signature : ({ getState, dispatch }) => next => action
 */
const finalCreateStore = applyMiddleware(...middlewares)(combinedCreateStore);

/**
 * Importing the rootReducer which combines all the other ones, including the reducer of the routerStateReducer
 * This work is done in ./modules/reducer.js
 */
const rootReducer = require('./modules/reducer');

export default function configureStore(initialState) {

  /**
   * The store can finally be created based on the rootReducer and finalCreateStore function,
   * as we would have done createStore(reducers), but with composed versions of each ones,
   * thanks to functional programming
   */
  const store = finalCreateStore(rootReducer, initialState);

  if (process.env.DEVTOOLS) {
    reduxRouterMiddleware.listenForReplays(store);
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules/reducer', () => {
      console.log('reloading reducer');
      const nextRootReducer = require('./modules/reducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
