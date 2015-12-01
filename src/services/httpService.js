'use strict';

/**
 * To avoid having to involve webpack into requiring modules when we'll execute any code server-side
 * I dropped the resolve.alias solution in favor of dependency injection.
 */

var instance = null;

class HttpService{
  constructor(configuration){
    if(process.env.NODE_ENV === 'mock'){
      this.service = require('./httpService/http.stub');
    }
    else{
      this.service = require('./httpService/http');
    }
  }
  get(relativeUrl,params){
    return this.service.get(relativeUrl,params);
  }
}

export default {
  getInstance(){
    if(instance === null){
      instance = new HttpService();
      // in production, the backend is on a heroku VM,
      // a simple ping will get it awake before the user really uses the github api
      // it will avoid 6secs startup (for the first user)
      if(process.env.NODE_ENV === 'production') {
        instance.get('/?format=json');
      }
    }
    return instance;
  }
}
