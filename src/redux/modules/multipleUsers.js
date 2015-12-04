/**
 * All the reducers from each modules are combined into a rootReducer and exported by ./reducer.js
 */

import githubClient from '../../services/github.js';

/**
 * TL;DR: Following explains the organization choice of action creators / reducer grouped in modules.
 *        Skip it if you only care about the data flow (explained in comments bellow).
 *
 * Specify constants for action types that will be shared by
 * - action creators
 * - reducers
 *
 * This way, it's easier to see which action types are used in which context (action creators/reducers)
 * than to have a big list of constants in a file you end up not knowing which one is used where.
 *
 * You might have to export them (and expose them out of the module - breaking encapsulation),
 * if you want to do thorough unit-tests of your action creators, by calling one and comparing the action outputed
 * (you will compare action.type against the constant amongst other things)
 */
const CHANGE_USERNAME = 'multipleUsers/CHANGE_USERNAME';
const FETCH_USERS = 'multipleUsers/FETCH_USERS';
const FETCH_USERS_SUCCESS = 'multipleUsers/FETCH_USERS_SUCCESS';
const FETCH_USERS_ERROR = 'multipleUsers/FETCH_USERS_ERROR';

const initialState = {
  username: '',
  results: null,
  fetching: false
};

/**
 * The reducer is the default export.
 * The actions will be named exports.
 */

/* *********** Reducer ************/

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return {
        ...state,
        username: action.username
      };
    case FETCH_USERS:
      return {
        ...state,
        fetching: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        results: action.result.data
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        fetching: false,
        results: {
          error: action.error.humanMessage
        }
      };
    default:
      return state;
  }
}

/* *********** Action creators ************/

/**
 * Called on input change
 */
export function changeUsername(username = '') {
  return {
    type: CHANGE_USERNAME,
    username
  };
}

/**
 * This is the only action creator exported (not including changeUsername).
 * It's using a sugar syntax enabled by the clientMiddleware (see explanation in ../middleware/clientMiddleware.js)
 */
export function findUsers(username) {
  return {
    types: [FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR],
    promise: () => githubClient.searchUser(username)
  };

  // the version without using the clientMiddleware syntax sugar:
  /*
  return dispatch => {
    dispatch({
      type: FETCH_USERS,
      username
    }); // request will start
    return githubClient.searchUser(username)
      .then(result => dispatch({
        type: FETCH_USERS_SUCCESS,
        result
      })) // request succeeded
      .catch(error => dispatch({
        type: FETCH_USERS_ERROR,
        error
      })); // request failed
  };
  */
}
