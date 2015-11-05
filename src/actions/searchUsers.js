'use strict';

import * as constants from '../constants.js';

import githubClient from '../services/github.js';

export function changeSearchUser(username = ''){
  return {
    type: constants.CHANGE_SEARCH_USERS,
    username
  }
}

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

function fetchSearchUsers(username, dispatch) {
  return githubClient.searchUser(username)
    .then(json => dispatch(receiveSearchUsers(json)))
    .catch(error => dispatch(receiveSearchUsersError(error)))
}

export function searchUsers(username){
  return dispatch => {
    dispatch(requestSearchUsers(username))
    fetchSearchUsers(username, dispatch);
  }
}