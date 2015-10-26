'use strict';

import * as constants from '../constants.js';

export function increment (){
  return {
    type: constants.INCREMENT
  }
}