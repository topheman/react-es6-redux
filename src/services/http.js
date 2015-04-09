'use strict';

import request from 'superagent';

import configuration from 'configuration';

export default {
  get(relativeUrl,params){
    var promise = new Promise(function(resolve, reject){

      var url = configuration.backendBaseUrl+relativeUrl;

      //add query params
      if(typeof params === 'object' && params !== null){
        if(Object.keys(params).length > 0){
          var query = '';
          for(let name in params){
            if(typeof params[name] !== 'object') {
              query += query === '' ? '' : '&';
              query += name + '=' + params[name];
            }
          }
          url += (query !== '') ? ('?'+query) : '';
        }
      }
      //init the object param, not to have to check it bellow
      else{
        params = {};
      }

      request.get(url).set('Accept', 'application/json')
        .end(function(err, res){
          if(err || !res){
            if(typeof res !== 'undefined' && res.headers && typeof res.headers['x-ratelimit-remaining'] !== 'undefined'){
              return reject({
                kind: 'rateLimit',
                message: err,
                humanMessage: "The server is very crowded, please try again in a few seconds.",
                status: res.status,
                type: res.type
              })
            }
            else {
              return reject({
                kind: "error",
                message: err ? err : 'No response',
                humanMessage: "An error occured, please try again."
              });
            }
          }
          var objectToResolve = {
            data: res.body,
            status: res.status,
            type: res.type,
            infos: {
              ratelimitRemaining: res.headers['x-ratelimit-remaining'],
              etag:res.headers['etag']
            }
          };
          //passing some relevant infos from the params in the request to the response
          if(typeof params.page !== 'undefined'){
            objectToResolve.infos.page = params.page;
          }
          if(typeof params.per_page !== 'undefined'){
            objectToResolve.infos.per_page = params.per_page;
          }
          //adding metas infos
          if(res.headers['link']){
            let result = {};
            var toProcess = res.headers['link'].split(' ');
            for(let i=0; i<toProcess.length; i++){
              if(i%2 === 0) {
                result[toProcess[i+1].replace('rel="','').replace(/\"\,?/,'')] = toProcess[i].replace('<','').replace('>;','');//@todo cleaner way with one regexp ?
              }
            }
            objectToResolve.infos.link = result;
            if(result.last) {
              let totalPages = result.last.match(/page=([0-9]+)/);
              if(totalPages[1]){
                objectToResolve.infos.totalPages = parseInt(totalPages[1]);
              }
            }
            else{
              let totalPages = result.prev.match(/page=([0-9]+)/);
              if(totalPages[1]){
                objectToResolve.infos.totalPages = parseInt(totalPages[1])+1;
              }
            }
          }
          else {
            objectToResolve.infos.totalPages = 1;
          }
          return resolve(objectToResolve);
        });
    });
    return promise;
  }
}