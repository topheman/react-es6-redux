/**
 * This is the github client which decorates requests and responses from github.
 * It will adapt to the API_ROOT_URL you pass in env var.
 * In mock mode, it won't make any http requests, but will use the test/fixtures/http.json mock files (generated via npm run generate-http-fixtures)
 */

const request = require('superagent');

if (process.env.NODE_ENV === 'mock') {
  require('./http.mock.js')(request);
}

export default {
  get(relativeUrl, params = {}) {

    const promise = new Promise((resolve, reject) => {

      let url = process.env.API_ROOT_URL + relativeUrl;

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

      request.get(url).set('Accept', 'application/json')
        .end((err, res) => {
          if (err || !res) {
            if (typeof res !== 'undefined' && res.headers && res.headers['x-ratelimit-remaining'] == 0) { // eslint-disable-line eqeqeq
              return reject({
                kind: 'rateLimit',
                message: err,
                humanMessage: 'The server is very crowded, please try again in a few seconds.',
                status: res.status,
                type: res.type
              });
            }
            if (typeof res !== 'undefined' && res.statusCode === 404) {
              return reject({
                kind: 'NotFound',
                message: err,
                humanMessage: 'No results.',
                status: res.status,
                type: res.type
              });
            }
            return reject({
              kind: 'error',
              message: err ? err : 'No response',
              humanMessage: 'An error occured, please try again.'
            });
          }
          const objectToResolve = {
            data: res.body,
            status: res.status,
            type: res.type,
            infos: {
              ratelimitRemaining: res.headers['x-ratelimit-remaining'],
              etag: res.headers.etag
            }
          };
          // passing some relevant infos from the params in the request to the response
          if (typeof params.page !== 'undefined') {
            objectToResolve.infos.page = params.page;
          }
          if (typeof params.per_page !== 'undefined') {
            objectToResolve.infos.per_page = params.per_page;
          }
          // adding metas infos
          if (res.headers.link) {
            const result = {};
            const toProcess = res.headers.link.split(' ');
            for (let i = 0; i < toProcess.length; i++) {
              if (i % 2 === 0) {
                result[toProcess[i + 1].replace('rel="', '').replace(/\"\,?/, '')] = toProcess[i].replace('<', '').replace('>;', '');// @todo cleaner way with one regexp ?
              }
            }
            objectToResolve.infos.link = result;
            if (result.last) {
              const totalPages = result.last.match(/page=([0-9]+)/);
              if (totalPages[1]) {
                objectToResolve.infos.totalPages = parseInt(totalPages[1], 10);
              }
            }
            else {
              const totalPages = result.prev.match(/page=([0-9]+)/);
              if (totalPages[1]) {
                objectToResolve.infos.totalPages = parseInt(totalPages[1], 10) + 1;
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
};
