import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';// the middleware part configuration of react-redux-router is done in configure-store.js

// reducers specific to app logic - to see an annotated reducer, open src/redux/modules/multipleUsers.js
import counter from './counter.js';
import multipleUsers from './multipleUsers.js';
import singleUser from './singleUser.js';

/**
 * Exporting a default root reducer combining all the other ones
 * (including the reducer of the router, since we use redux-router and so the state of the router is in the store)
 */
export default combineReducers({
  routing: routeReducer,
  counter,
  multipleUsers,
  singleUser
});
