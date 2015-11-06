'use strict';

import * as constants from '../constants.js';

import githubClient from '../services/github.js';

const REPOS_PER_PAGE = 15;

/**
 * Called to init pristineLogin
 */
export function initUserProfile(username = '') {
  return {
    type: constants.INIT_USER_PROFILE,
    username
  }
}

/*** user profile infos actions ***/

/**
 * The following action creators are not exported, nor used outside this module.
 * To be more concise, they could be inlined in place as dipatch({type,payload})
 */

function requestFetchUser(username) {
  return {
    type: constants.FETCH_USER_PROFILE_INFOS,
    username //username is not needed for state management, it helps loging/debug
  }
}

function receiveFetchUser(json) {
  return {
    type: constants.FETCH_USER_PROFILE_INFOS_SUCCESS,
    json
  }
}

function receiverFetchUserError(error) {
  return {
    type: constants.FETCH_USER_PROFILE_INFOS_ERROR,
    error
  }
}

export function getUser(username) {
  return dispatch => {
    dispatch(requestFetchUser(username))//request will start
    return githubClient.getUser(username)
      .then(json => dispatch(receiveFetchUser(json)))//request succeeded
      .catch(error => dispatch(receiverFetchUserError(error)))//request failed
  }
}

/*** user profile repos actions ***/

/**
 * The following action creators are not exported, nor used outside this module.
 * To be more concise, they could be inlined in place as dipatch({type,payload})
 */

function requestFecthUserRepos(username, options) {
  return {
    type: constants.FETCH_USER_PROFILE_REPOSITORIES,
    username,//username & options are not needed for state management, it helps loging/debug
    options
  }
}

function receiveFetchUserRepos(json) {
  return {
    type: constants.FETCH_USER_PROFILE_REPOSITORIES_SUCCESS,
    json
  }
}

function receiveFetchUserReposError(error) {
  return {
    type: constants.FETCH_USER_PROFILE_REPOSITORIES_ERROR,
    error
  }
}

/**
 * This is the only action exported (excluding the change).
 * Since async action are involved, the signature is (dispatch) => { ... }
 */
export function getUserRepos(username, {page = 1, sort = 'stars', per_page = REPOS_PER_PAGE} = {}) {
  return dispatch => {
    dispatch(requestFecthUserRepos(username, {page, sort, per_page}))//request will start
    githubClient.getUserRepos(username, {page, sort, per_page})
      .then(json => dispatch(receiveFetchUserRepos(json)))//request succeeded
      .catch(error => dispatch(receiveFetchUserReposError(error)))//request failed
  }
}