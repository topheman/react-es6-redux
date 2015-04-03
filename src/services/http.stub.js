'use strict';

/**
 * This module is here to replace http.js for test purposes (or offline development)
 * to provide data from the json files referenced bellow which are snapshots of results from the github API
 *
 * In /src/config.mock.js you can configure the timeOut (to emulate network traffic)
 */

import configuration from 'configuration';

import _mockGithubUser from './http.mocks/user.json';
import _mockGithubRepos from './http.mocks/repos.json';
import _mockGithubFollowers from './http.mocks/followers.json';
import _mockGithubUsersSearch from './http.mocks/users.search.json';

const mockJsonFiles = {
  '/github/users/': _mockGithubUser,
  '/github/search/users?q=': _mockGithubUsersSearch,
  '/github/users/*/repos': _mockGithubRepos,
  '/github/users/*/followers': _mockGithubFollowers
};

export default {
  get(relativeUrl){
    var promise = new Promise(function(resolve, reject){
      var result = null;
      for(let endpoint in mockJsonFiles){
        if(endpoint.indexOf('*') === -1 && relativeUrl.indexOf(endpoint) > -1){
          result = mockJsonFiles[endpoint];
          break;
        }
        else{
          let regexp = new RegExp(endpoint.replace('*','\\w+') + '.*');
          if(regexp.test(relativeUrl) === true){
            result = mockJsonFiles[endpoint];
            break;
          }
        }
      }
      if(result !== null){
        var resolvedData = {
          data: result,
          status: 200,
          type: 2,
          infos: {
            ratelimitRemaining: 123456,//@todo mock it ?
            etag: (new Date()).getTime().toString()//@todo mock it ?
          }
        };
        if(typeof configuration.timeOut === 'number'){
          setTimeout(function(){
            console.info('http.stub.js',relativeUrl,resolvedData);
            return resolve(resolvedData);
          },configuration.timeOut);
        }
        else{
          console.info('http.stub.js',relativeUrl,resolvedData);
          return resolve(resolvedData);
        }
      }
      else{
        var resolvedData = {
          kind: "error",
          message: "No endpoint matched in available mocks",
          humanMessage: "An error occured, please try again."
        }
        if(typeof configuration.timeOut === 'number'){
          setTimeout(function(){
            console.error('http.stub.js',relativeUrl,resolvedData);
            return reject(resolvedData);
          },configuration.timeOut);
        }
        else{
          console.error('http.stub.js',relativeUrl,resolvedData);
          return reject(resolvedData);
        }
      }
    });
    return promise;
  }
}