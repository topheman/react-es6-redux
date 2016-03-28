//require('babel-core/register');// write tests in es6 // removing transpilation (babel transformers are messing with protractor config ...)
var SpecReporter = require('jasmine-spec-reporter');
var pkg = require('./package.json');

/**
 * The default port on which the test will be run is the one specified in package.json under config.port
 *
 * To overload this port, just pass the flag --port
 *
 * Use the global goToUrl(relativeUrl) helper (which will use what ever port you defined)
 *
 */
var argv = require('minimist')(process.argv.slice(2));
var PORT = argv.port || (pkg.config ? (pkg.config.port ? pkg.config.port : null) : null) || 8080;
var BASE_URL = argv['base-url'] || 'http://localhost';
console.log('[INFOS] Testing on ' + BASE_URL + ':' + PORT);

var specs = [
  'test/e2e/**/*.spec.js'
];

var config = {
  framework: 'jasmine2',
  specs: specs,
  onPrepare: function () {
    browser.ignoreSynchronization = true;
    /**
     * Helper to use instead of directly `browser.get` so that you don't bother about the port
     * baseUrl and port are optional and can be overriden globally when launching protractor
     * with the flags --base-url and --port
     * @param relativeUrl
     * @param baseUrl
     * @param port
     */
    global.goToUrl = function (relativeUrl, baseUrl, port) {
      baseUrl = typeof baseUrl === 'undefined' ? BASE_URL : baseUrl;
      port = typeof port === 'undefined' ? PORT : port;
      return browser.get(baseUrl + ':' + port + relativeUrl);
    };
    global.waitUntilIsElementPresent = function(element, timeout) {
      timeout = typeof timeout !== 'undefined' ? timeout : 4000;
      return browser.driver.wait(() => {
        return browser.driver.isElementPresent(element);
      }, timeout);
    };
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};

if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.capabilities = {
    'name': 'react-es6-redux E2E node v' + process.env.TRAVIS_NODE_VERSION,
    'browserName': 'chrome',
    'seleniumVersion': '2.48.2',
    'chromedriverVersion': '2.20',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER
  };
}

module.exports.config = exports.config = config;
