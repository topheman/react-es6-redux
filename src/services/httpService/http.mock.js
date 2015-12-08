/**
 * This function decorates "request" and adds the mock fixtures generated via npm run generate-http-fixtures
 *
 * It will be on when you npm run webpack-mock
 */

import fixtures from '../../../test/fixtures/http.json';

export default function mockRequest(request) {

  const mock = require('superagent-mocker')(request);

  if (fixtures.length === 0) {
    throw new Error('Fixtures missing, please npm run generate-http-fixtures');
  }
  fixtures.forEach((fixture) => {
    console.info('mocking', fixture.path);
    mock.get(fixture.scope + fixture.path, (req) => {
      const res = {
        headers: fixture.headers,
        body: fixture.response,
        status: fixture.status
      };
      console.log('MOCK', fixture.path, req, res);
      return res;
    });
  });

  return mock;
}
