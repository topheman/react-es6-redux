'use strict';

import http from './http.js';

export default {
  searchUser(userName){
    return http.get('/github/search/users?q='+userName);
  }
}