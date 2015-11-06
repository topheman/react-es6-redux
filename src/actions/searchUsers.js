'use strict';

import * as constants from '../constants.js';

import githubClient from '../services/github.js';

/**
 * Called on input change
 */
export function changeSearchUser(username = ''){
  return {
    type: constants.CHANGE_SEARCH_USERS,
    username
  }
}

/**
 * The following action creators are not exported, nor used outside this module.
 * To be more concise, they could be inlined in place as dipatch({type,payload})
 */

function requestSearchUsers(username){
  return {
    type: constants.FETCH_SEARCH_USERS,
    username
  }
}

function receiveSearchUsers(json){
  return {
    type: constants.FETCH_SEARCH_USERS_SUCCESS,
    json
  }
}

function receiveSearchUsersError(error){
  return {
    type: constants.FETCH_SEARCH_USERS_ERROR,
    error
  }
}

/**
 * This is the only action exported (excluding the change).
 * Since async action are involved, the signature is (dispatch) => { ... }
 */
export function searchUsers(username){
  return dispatch => {
    dispatch(requestSearchUsers(username))//request will start
    return githubClient.searchUser(username)
      .then(json => dispatch(receiveSearchUsers(json)))//request succeeded
      .catch(error => dispatch(receiveSearchUsersError(error)))//request failed
  }
}