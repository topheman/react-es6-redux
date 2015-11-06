'use strict';

import { merge } from 'lodash';

import * as constants from '../constants.js';

/**
 * Main reducer
 * (This part could be simplier I flattened the structure - I wouldn't need a main reducer and two subreducers)
 */
export default function singleUser(state, action) {
  state = state || {
      profile:{
        pristineLogin: '',
        data: null,
        fetching: false
      },
      repositories: {
        pristineLogin: '',
        data: null,
        fetching: false
      }
    };
  switch (action.type){
    case constants.INIT_USER_PROFILE:
      return merge({}, state, {
        profile:{
          pristineLogin: action.username
        },
        repositories:{
          pristineLogin: action.username
        }
      });
    case constants.FETCH_USER_PROFILE_INFOS:
    case constants.FETCH_USER_PROFILE_INFOS_ERROR:
    case constants.FETCH_USER_PROFILE_INFOS_SUCCESS:
    case constants.FETCH_USER_PROFILE_REPOSITORIES:
    case constants.FETCH_USER_PROFILE_REPOSITORIES_ERROR:
    case constants.FETCH_USER_PROFILE_REPOSITORIES_SUCCESS:
      return Object.assign({},{
        profile: profileInfosReducer(state.profile, action),
        repositories: profileRepositoriesReducer(state.repositories, action)
      });
    default:
      return state;
  }
}

/**
 * Sub reducers - since data structure is not flat, to keep immutability AND readability
 * I broke the main reducer into subreducers
 */

/**
 * Receives and returns only a part of the state : state.profile, but doesn't have to know about it
 */
function profileInfosReducer(state, action) {
  switch(action.type) {
    case constants.FETCH_USER_PROFILE_INFOS:
      return Object.assign({},{
        pristineLogin: state.pristineLogin,
        fetching: true
      });
    case constants.FETCH_USER_PROFILE_INFOS_SUCCESS:
      return Object.assign({},{
        pristineLogin: state.pristineLogin,
        fetching: false,
        data: action.json.data
      });
    case constants.FETCH_USER_PROFILE_INFOS_ERROR:
      return Object.assign({},{
        pristineLogin: state.pristineLogin,
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
function profileRepositoriesReducer(state, action) {
  switch(action.type) {
    case constants.FETCH_USER_PROFILE_REPOSITORIES:
      return Object.assign({},{
        pristineLogin: state.pristineLogin,
        fetching: true
      });
    case constants.FETCH_USER_PROFILE_REPOSITORIES_SUCCESS:
      return Object.assign({},{
        pristineLogin: state.pristineLogin,
        fetching: false,
        data: action.json.data,
        infos: action.json.infos
      });
    case constants.FETCH_USER_PROFILE_REPOSITORIES_ERROR:
      return Object.assign({},{
        pristineLogin: state.pristineLogin,
        fetching: false,
        error : action.error.humanMessage
      });
    default:
      return state;
  }
}