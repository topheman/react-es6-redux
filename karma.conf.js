// retrieve args
const argv = require('minimist')(process.argv.slice(2));
const TRAVIS = process.env.TRAVIS;
const COVERAGE = argv.coverage === true || TRAVIS;// code coverage on by default on TRAVIS, or activated by flag --coverage

// the following env vars are used in webpack.config.js
process.env.UNIT_TEST = true;

const path = require('path');
const webpackConfig = require('./webpack.config');
const log = require('npmlog');
log.level = 'silly';

const plugins = [
  'karma-webpack',
  'karma-sinon',
  'karma-mocha',
  'karma-mocha-reporter',
  'karma-sourcemap-loader',
  'karma-chrome-launcher',
  'karma-phantomjs-launcher'
];
const reporters = ['mocha'];
// default coverage reporter (we may want different reporters between local & CI)
var coverageReporter = {
  reporters: [
    {type: 'lcov', dir: './build/reports/coverage'}
  ]
};

if (COVERAGE) {
  log.info('karma', 'COVERAGE mode enabled');
  reporters.push('coverage');
  plugins.push('karma-coverage');
}
if (COVERAGE && TRAVIS) {
  log.info('karma', 'TRAVIS mode - will send coverage reports to coveralls.io');
  reporters.push('coveralls');
  plugins.push('karma-coveralls');
  coverageReporter = { type: 'lcovonly', dir: './build/reports/coverage' };
}

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon'],
    files: [
      'test/unit/init.js',// include the throw on console.error
      'src/**/*.spec.js'// unit-test files
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: webpackConfig.module.loaders // re-use the exact same loaders declared in webpack.config.js
      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: plugins,


    //babelPreprocessor: {
    //  options: {
    //    presets: ['airbnb']
    //  }
    //},
    coverageReporter: coverageReporter,
    reporters: reporters,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  })
};
