/**
 * This module is here to replace http.js for test purposes (or offline development)
 * to provide data from the json files referenced bellow which are snapshots of results from the github API
 *
 * You can configure the latency of the response that way:
 * `STUB_MOCK_TIMEOUT=500 npm run webpack-mock` the response will have latency of 500ms (to emulate network traffic)
 * `STUB_MOCK_TIMEOUT=false npm run webpack-mock` immediate
 */

import _mockGithubUser from './http.mocks/user.json';
import _mockGithubRepos from './http.mocks/repos.json';
import _mockGithubFollowers from './http.mocks/followers.json';
import _mockGithubUsersSearch from './http.mocks/users.search.json';

const mockJsonFiles = {
  '/users/topheman/repos': _mockGithubRepos,
  '/users/topheman/followers': _mockGithubFollowers,
  '/users/topheman': _mockGithubUser,
  '/search/users?q=tophe': _mockGithubUsersSearch
};

const STUB_MOCK_TIMEOUT = process.env.STUB_MOCK_TIMEOUT;

export default {
  get(relativeUrl, params = {}) {
    const promise = new Promise((resolve, reject) => {

      let url = relativeUrl;

      // add query params
      if (typeof params === 'object' && params !== null) {
        if (Object.keys(params).length > 0) {
          let query = '';
          for (const name in params) {
            if (typeof params[name] !== 'object') {
              query += query === '' ? '' : '&';
              query += name + '=' + params[name];
            }
          }
          url += (query !== '') ? ('?' + query) : '';
        }
      }

      let result = null;
      for (const endpoint in mockJsonFiles) {
        if (endpoint.indexOf('*') === -1 && url.indexOf(endpoint) > -1) {
          result = mockJsonFiles[endpoint];
          break;
        }
        else {
          const regexp = new RegExp(endpoint.replace('*', '\\w+') + '.*');
          if (regexp.test(url) === true) {
            result = mockJsonFiles[endpoint];
            break;
          }
        }
      }
      if (result !== null) {
        const resolvedData = {
          data: result,
          status: 200,
          type: 2,
          infos: {
            ratelimitRemaining: 123456, // @todo mock it ?
            etag: (new Date()).getTime().toString()// @todo mock it ?
          }
        };
        if (typeof STUB_MOCK_TIMEOUT === 'number') {
          setTimeout(() => {
            console.info('http.stub.js', url, resolvedData);
            return resolve(resolvedData);
          }, STUB_MOCK_TIMEOUT);
        }
        else {
          console.info('http.stub.js', url, resolvedData);
          return resolve(resolvedData);
        }
      }
      else {
        const resolvedData = {
          kind: 'error',
          message: 'No endpoint matched in available mocks',
          humanMessage: 'An error occured, please try again.'
        };
        if (typeof STUB_MOCK_TIMEOUT === 'number') {
          setTimeout(() => {
            console.error('http.stub.js', url, resolvedData);
            return reject(resolvedData);
          }, STUB_MOCK_TIMEOUT);
        }
        else {
          console.error('http.stub.js', url, resolvedData);
          return reject(resolvedData);
        }
      }
    });
    return promise;
  }
};
