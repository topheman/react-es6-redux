'use strict';

import http from 'serviceHttp';

export default {
  searchUser(userName){
    return http.get('/github/search/users',{q:userName});
  },
  getUser(userName){
    return http.get('/github/users/'+userName);
  },
  getUserRepos(userName,options = {per_page: 30, page: 1, sort: "updated"}){
    return http.get('/github/users/'+userName+'/repos',{
      page: options.page,
      per_page: options.per_page,
      sort: options.sort
    });
  }
}