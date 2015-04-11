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
    }
    return instance;
  }
}