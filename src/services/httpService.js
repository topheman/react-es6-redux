'use strict';

/**
 * To avoid having to involve webpack into requiring modules when we'll execute any code server-side
 * I dropped the resolve.alias solution in favor of dependency injection.
 */

var instance = null;

class HttpService{
  constructor(configuration){
    this.service = configuration.injectHttp;
    this.service.configuration = {};
    //expose rest of the config to the service (usefull for backendBaseUrl, timeOut ...)
    for(let name in configuration){
      if(name !== 'injectHttp'){
        this.service.configuration[name] = configuration[name];
      }
    }
  }
  get(relativeUrl,params){
    return this.service.get(relativeUrl,params);
  }
}

export default {
  getInstance(configuration){
    if(instance === null){
      if(typeof configuration === 'undefined'){
        throw new Error("First time you instantiate the httpService singleton, you must pass the configuration");
      }
      instance = new HttpService(configuration);
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