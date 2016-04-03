// retrieve args
const argv = require('minimist')(process.argv.slice(2));
const COVERAGE = argv.coverage === true;

// the following env vars are used in webpack.config.js
process.env.UNIT_TEST = true;

const path = require('path');
const webpackConfig = require('./webpack.config');
const log = require('npmlog');
log.level = 'silly';

const reporters = ['mocha'];
const coverageReporter_reporters = [
  {type: 'lcov', dir: './build/reports/coverage'}
];

if (COVERAGE) {
  log.info('karma', 'COVERAGE mode enabled');
  reporters.push('coverage');
}

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon'],
    files: [
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
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: [
      'karma-webpack',
      'karma-sinon',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ],


    //babelPreprocessor: {
    //  options: {
    //    presets: ['airbnb']
    //  }
    //},
    coverageReporter: {
      reporters: coverageReporter_reporters
    },
    reporters: reporters,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  })
};
