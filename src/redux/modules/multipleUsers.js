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
        results: action.json.data
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
 * The following action creators are not exported, nor used outside of this module.
 * To be more concise, they could be inlined in place as dipatch({type,payload})
 */

function requestFetchUsers(username) {
  return {
    type: FETCH_USERS,
    username
  };
}

function receiveFetchUsers(json) {
  return {
    type: FETCH_USERS_SUCCESS,
    json
  };
}

function receiveFetchUsersError(error) {
  return {
    type: FETCH_USERS_ERROR,
    error
  };
}

/**
 * This is the only action creator exported (not including changeUsername).
 * Since async action are involved, the signature is (dispatch) => { ... } (thanks to redux-thunk - https://github.com/gaearon/redux-thunk )
 */
export function findUsers(username) {
  return dispatch => {
    dispatch(requestFetchUsers(username)); // request will start
    return githubClient.searchUser(username)
      .then(json => dispatch(receiveFetchUsers(json))) // request succeeded
      .catch(error => dispatch(receiveFetchUsersError(error))); // request failed
  };
}
