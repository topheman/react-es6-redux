'use strict';

import request from 'superagent';

import configuration from 'configuration';

export default {
  get(relativeUrl){
    var promise = new Promise(function(resolve, reject){
      request.get(configuration.backendBaseUrl+relativeUrl).set('Accept', 'application/json')
        .end(function(err, res){
          if(err){
            if(res && res.headers && typeof res.headers['x-ratelimit-remaining'] !== 'undefined'){
              reject({
                type: 'rateLimit',
                message: err,
                humanMessage: "The server is very crowded, please try again in a few seconds."
              })
            }
            else {
              reject({
                type: "error",
                message: err,
                humanMessage: "An error occured, please try again."
              });
            }
          }
          resolve({
            data: res.body,
            infos: {
              ratelimitRemaining: res.headers['x-ratelimit-remaining']
            }
          });
        });
    });
    return promise;
  }
}