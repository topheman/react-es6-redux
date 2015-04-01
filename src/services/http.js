'use strict';

import request from 'superagent';

import configuration from 'configuration';

export default {
  get(relativeUrl){
    var promise = new Promise(function(resolve, reject){
      request.get(configuration.backendBaseUrl+relativeUrl).set('Accept', 'application/json')
        .end(function(err, res){
          if(err){
            reject(err);
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