'use strict';

import request from 'superagent';

import configuration from 'configuration';

export default {
  get(relativeUrl){
    var promise = new Promise(function(resolve, reject){
      request.get(configuration.backendBaseUrl+relativeUrl).set('Accept', 'application/json')
        .end(function(err, res){
          if(err || !res){
            if(typeof res !== 'undefined' && res.headers && typeof res.headers['x-ratelimit-remaining'] !== 'undefined'){
              return reject({
                type: 'rateLimit',
                message: err,
                humanMessage: "The server is very crowded, please try again in a few seconds."
              })
            }
            else {
              return reject({
                type: "error",
                message: err ? err : 'No response',
                humanMessage: "An error occured, please try again."
              });
            }
          }
          return resolve({
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