'use strict';

import * as constants from '../constants.js';

export default function searchUsers(state, action){
  state = state || {username: '', results: null, fetching: false};
  switch(action.type){
    case constants.CHANGE_SEARCH_USERS:
      return Object.assign({}, state, {
        username: action.username
      })
    case constants.FETCH_SEARCH_USERS:
      return Object.assign({}, state, {
        fetching: true
      })
    case constants.FETCH_SEARCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        results: action.json.data
      })
    case constants.FETCH_SEARCH_USERS_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        results: {
          error: action.error.humanMessage
        }
      })
    default:
      return state;
  }
}