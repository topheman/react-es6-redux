/**
 * This script records the http requests (requests / response with body and headers)
 * so that they could be mocked for unit test.
 * This task is automated, this way, you don't have to bother to do it manually ! ;-)
 *
 * For the moment, I request the github API via topheman-apis-proxy (direct request gives encoded results, which might
 * be because of https or gzip which aren't managed yet by nock).
 */

const nock = require('nock');
const request = require('superagent');
const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = './test/fixtures/http.json';

nock.recorder.rec({
  output_objects: true,
  enable_reqheaders_recording: true,
  dont_print: true
});

const uris = [
  '/users/topheman',
  '/users/topheman/repos?page=1&per_page=15&sort=stars',
  '/users/topheman/repos?page=2&per_page=15&sort=stars',
  '/users/topheman/repos?page=3&per_page=15&sort=stars',
  '/users/topheman/followers',
  '/search/users?q=tophe',
  '/search/users?q=topheman', // this one is to return "one result"
  '/search/users?q=aaazzzeeerrrtttyyyuuuiiioooppp' // this one is to return "no results"
];

const promises = uris.map((uri) => {
  return request.get('http://localhost:8000/github' + uri)
});

Promise.all(promises)
  .then(() => {
    const nockCallObjects = nock.recorder.play();
    if (nockCallObjects.length > 0) {
      // bellow some processing to cleanup the mock so that they could be correctly used (according to your use-case, it could differ a little)
      const output = nockCallObjects.map((item) => {
        item.scope = 'http://localhost'; // change the host name (avoid CORS), and protocol (superagent-mocker considers ":" as wildcard, so you can't put a port)
        item.path = item.path.replace(/^\/github/,''); // remove the leading "/github" (in topheman-apis-proxy), so that relative url will be used
        item.path = item.path.replace('aaazzzeeerrrtttyyyuuuiiioooppp',':username'); // this one is to return "no results"
        console.log(item.path);
        return item;
      });
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output));
      console.log('Saved in ', OUTPUT_PATH);
      process.exit(0);
    }
    throw new Error('No results');
  })
  .catch(error => console.log('[ERROR]', error.message));
