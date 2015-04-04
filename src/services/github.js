'use strict';

import http from 'serviceHttp';

export default {
  searchUser(userName){
    return http.get('/github/search/users?q='+userName);
  },
  getUser(userName){
    return http.get('/github/users/'+userName);
  },
  getUserRepos(userName){
    return http.get('/github/users/'+userName+'/repos');
  }
}