'use strict';

import * as constants from '../constants.js';

export default function counter(state, action){
  state = typeof state === 'undefined' ? 0 : state;
  switch(action.type){
    case constants.INCREMENT:
      return state + 1;
    default:
      return state;
  }
}