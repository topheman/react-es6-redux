'use strict';

import httpService from './httpService.js';

//the following var keeps the httpService singleton which has been first instanciated in the bootstrap
//don't make the getInstance here, webpack will require it before the bootstrap (since it's deeper in the modules)
var http;

export default {
  searchUser(userName){
    http = httpService.getInstance();//the config is not passed here, it was passed in the bootstrap
    return http.get('/github/search/users',{q:userName});
  },
  getUser(userName){
    http = httpService.getInstance();//the config is not passed here, it was passed in the bootstrap
    return http.get('/github/users/'+userName);
  },
  getUserRepos(userName,options = {per_page: 30, page: 1, sort: "updated"}){
    http = httpService.getInstance();//the config is not passed here, it was passed in the bootstrap
    return http.get('/github/users/'+userName+'/repos',{
      page: options.page,
      per_page: options.per_page,
      sort: options.sort
    });
  }
}