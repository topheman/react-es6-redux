'use strict';

import lscache from 'lscache';

const cacheLimit = 2;//2 minutes

export default{
  get: lscache.get,
  set: function(key, value){
    return lscache.set(key, value, cacheLimit);
  },
  //extend of cacheLimit mins
  extend: function(key){
    const value = lscache.get(key);
    if(typeof value !== 'undefined'){
      this.set(key,value);
    }
  }
};
