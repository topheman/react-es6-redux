'use strict';

import { combineReducers } from 'redux';

import * as constants from '../constants.js';

/**
 * Receives and returns only a part of the state : state.profile, but doesn't have to know about it
 */
function profile(state, action) {
  state = state || {
    pristineLogin: '',
    data: null,
    fetching: false,
    error: null
  };
  switch(action.type) {
    case constants.INIT_USER_PROFILE:
      return Object.assign({},state,{
        pristineLogin: action.username,
        data: null,
        fetching: false,
        error: null
      });
    case constants.FETCH_USER_PROFILE_INFOS:
      return Object.assign({},state,{
        fetching: true
      });
    case constants.FETCH_USER_PROFILE_INFOS_SUCCESS:
      return Object.assign({},state,{
        fetching: false,
        data: action.json.data
      });
    case constants.FETCH_USER_PROFILE_INFOS_ERROR:
      return Object.assign({},state,{
        fetching: false,
        error : action.error.humanMessage
      });
    default:
      return state;
  }
}

/**
 * Receives and returns only a part of the state : state.profile, but doesn't have to know about it
 */
function repositories(state, action) {
  state = state || {
      pristineLogin: '',
      data: null,
      fetching: false,
      infos: null,
      error: null
    };
  switch(action.type) {
    case constants.INIT_USER_PROFILE:
      return Object.assign({},state,{
        pristineLogin: action.username,
        data: null,
        fetching: false,
        infos: null,
        error: null
      });
    case constants.FETCH_USER_PROFILE_REPOSITORIES:
      return Object.assign({},state,{
        fetching: true
      });
    case constants.FETCH_USER_PROFILE_REPOSITORIES_SUCCESS:
      return Object.assign({},state,{
        fetching: false,
        data: action.json.data,
        infos: action.json.infos
      });
    case constants.FETCH_USER_PROFILE_REPOSITORIES_ERROR:
      return Object.assign({},state,{
        fetching: false,
        error : action.error.humanMessage
      });
    default:
      return state;
  }
}

/**
 * Previous reducers are combined together in a higher reducer that is at the level state.singleUser
 */
const singleUser = combineReducers({
  profile,
  repositories
});

export default singleUser;