/**
 * inspired by https://github.com/emmenko/redux-react-router-async-example
 *
 * I added some comments to help understand the code
 */

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { reduxReactRouter, routerStateReducer } from 'redux-router';
import createHashHistory from 'history/lib/createHashHistory';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';

const createHistory = () => {
  return createHashHistory({queryKey: 'hash'});
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
//see in Root.jsx about this patters with process.env.DEVTOOLS and require over import
if (process.env.DEVTOOLS) {
  const { devTools } = require('redux-devtools');
  storeEnhancers.push(devTools());
}

/**
 * storeEnhancers contained in the array are composed in one which alters the original createStore function from redux
 * You can see it as : combinedCreateStore = storeEnhancers[0](storeEnhancers[1](createStore))
 */
combinedCreateStore = compose(...storeEnhancers)(createStore)

let middlewares = [thunk];

if (process.env.DEVTOOLS){
  middlewares.push(require('../middleware/logger'));
}

/**
 * The applyMiddleware allows us to add the following middlewares to the previously altered version of createStore.
 * The redux middlewares have the signature : ({ getState, dispatch }) => next => action
 */
const finalCreateStore = applyMiddleware(...middlewares)(combinedCreateStore)

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
      const nextRootReducer = combineReducers(Object.assign({
        router: routerStateReducer
      }, require('../reducers/index')));
      store.replaceReducer(nextRootReducer)
    });

  return store;
}