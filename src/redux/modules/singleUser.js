/**
 * For annotated version of a module managing action creators & reducers,
 * checkout src/redux/modules/multipleUsers.js
 */

import { combineReducers } from 'redux';

import githubClient from '../../services/github.js';

const REPOS_PER_PAGE = 15;

const INIT = 'singleUser/INIT';

const FETCH_PROFILE = 'singleUser/FETCH_PROFILE';
const FETCH_PROFILE_SUCCESS = 'singleUser/FETCH_PROFILE_SUCCESS';
const FETCH_PROFILE_ERROR = 'singleUser/FETCH_PROFILE_ERROR';

const FETCH_REPOSITORIES = 'singleUser/FETCH_REPOSITORIES';
const FETCH_REPOSITORIES_SUCCESS = 'singleUser/FETCH_REPOSITORIES_SUCCESS';
const FETCH_REPOSITORIES_ERROR = 'singleUser/FETCH_REPOSITORIES_ERROR';

const initialState = {
  profile: {
    pristineLogin: '',
    data: null,
    fetching: false,
    error: null
  },
  repositories: {
    pristineLogin: '',
    data: null,
    fetching: false,
    infos: null,
    error: null
  }
};

/* *********** Reducer (and sub-reducers) ************/

/**
 * profile sub-reducer
 *
 * Receives and returns only a part of the state : state.profile, but doesn't have to know about it.
 * This reducer is not exported "as is", it will be combined with an other (which will be the one to be exported)
 */
function profile(state = initialState.profile, action = {}) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState.profile,
        pristineLogin: action.username
      };
    case FETCH_PROFILE:
      return {
        ...state,
        fetching: true
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.result.data
      };
    case FETCH_PROFILE_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error.humanMessage
      };
    default:
      return state;
  }
}

/**
 * repositories sub-reducer
 *
 * Receives and returns only a part of the state : state.repositories, but doesn't have to know about it.
 * This reducer is not exported "as is", it will be combined with an other (which will be the one to be exported)
 */
function repositories(state = initialState.repositories, action = {}) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState.repositories,
        pristineLogin: action.username
      };
    case FETCH_REPOSITORIES:
      return {
        ...state,
        fetching: true
      };
    case FETCH_REPOSITORIES_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.result.data,
        infos: action.result.infos
      };
    case FETCH_REPOSITORIES_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error.humanMessage
      };
    default:
      return state;
  }
}

/**
 * Previous reducers are combined together in a higher reducer that is at the level state.singleUser
 */
const reducer = combineReducers({
  profile,
  repositories
});

/**
 * The reducer is the default export (it's done here because you can't export directly an assignment like `export const foo = 'bar';`
 */
export default reducer;

/* *********** Action creators ************/

export function initUsername(username = '') {
  return {
    type: INIT,
    username
  };
}

export function getProfile(username) {
  return {
    types: [FETCH_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_ERROR],
    promise: () => githubClient.getUser(username)
  };
}

export function getRepositories(username, {page = 1, sort = 'stars', per_page = REPOS_PER_PAGE} = {}) {// eslint-disable-line camelcase
  return {
    types: [FETCH_REPOSITORIES, FETCH_REPOSITORIES_SUCCESS, FETCH_REPOSITORIES_ERROR],
    promise: () => githubClient.getUserRepos(username, {page, sort, per_page})
  };
}
