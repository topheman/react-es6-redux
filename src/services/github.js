'use strict';

import http from './http.js';

export default {
  searchUser(userName){
    return http.get('/github/search/users?q='+userName);
  },
  getUser(userName){
    return http.get('/github/users/'+userName);
  }
}