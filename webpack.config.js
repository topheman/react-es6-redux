
const path = require('path');
const log = require('npmlog');
log.level = 'silly';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const myLocalIp = require('my-local-ip');
const common = require('./common');
const plugins = [];

const BANNER = common.getBanner();
const BANNER_HTML = common.getBannerHtml();

const root = __dirname;

const MODE_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') > -1 ? true : false;
const MODE_UNIT_TEST = process.argv[1].indexOf('karma') > -1 ? true : false;

log.info('webpack', 'Launched in ' + (MODE_DEV_SERVER ? 'dev-server' : (MODE_UNIT_TEST ? 'unit-test' : 'build') ) + ' mode');

/** environment setup */

const BUILD_DIR = './build';
const DIST_DIR = process.env.DIST_DIR || 'dist';// relative to BUILD_DIR
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const DEVTOOLS = process.env.DEVTOOLS ? JSON.parse(process.env.DEVTOOLS) : false;// can be useful in case you have web devtools (null by default to differentiate from true or false)
const SHOW_DEVTOOLS = process.env.SHOW_DEVTOOLS ? JSON.parse(process.env.SHOW_DEVTOOLS) : true;
// optimize in production by default - otherwize, override with OPTIMIZE=false flag (if not optimized, sourcemaps will be generated)
const OPTIMIZE = process.env.OPTIMIZE ? JSON.parse(process.env.OPTIMIZE) : NODE_ENV === 'production';
const LINTER = process.env.LINTER ? JSON.parse(process.env.LINTER) : true;
const FAIL_ON_ERROR = process.env.FAIL_ON_ERROR ? JSON.parse(process.env.FAIL_ON_ERROR) : !MODE_DEV_SERVER;// disabled on dev-server mode, enabled in build mode
const STATS = process.env.STATS ? JSON.parse(process.env.STATS) : false; // to output a stats.json file (from webpack at build - useful for debuging)
const LOCALHOST = process.env.LOCALHOST ? JSON.parse(process.env.LOCALHOST) : true;
const ASSETS_LIMIT = typeof process.env.ASSETS_LIMIT !== 'undefined' ? parseInt(process.env.ASSETS_LIMIT, 10) : 5000;// limit bellow the assets will be inlines
const hash = (NODE_ENV === 'production' && DEVTOOLS ? '-devtools' : '') + (NODE_ENV === 'production' ? '-[hash]' : '');
const DASHBOARD = process.env.DASHBOARD ? JSON.parse(process.env.DASHBOARD) : false;

const API_ROOT_URL = process.env.API_ROOT_URL ? process.env.API_ROOT_URL : 'https://api.github.com';

/** integrity checks */

if (/^\w+/.test(DIST_DIR) === false || /\/$/.test(DIST_DIR) === true) { // @todo make a better regexp that accept valid unicode leading chars
  log.error('webpack', `DIST_DIR should not contain trailing slashes nor invalid leading chars - you passed "${DIST_DIR}"`);
  process.exit(1);
}

log.info('webpack', `${NODE_ENV.toUpperCase()} mode`);
if (NODE_ENV === 'development') {
  // react-transform-hmr is activated is development mode - in some use case you may not need it -> specify a NODE_ENV
  // don't add the plugin `new webpack.HotModuleReplacementPlugin()` with the --hot flag
  log.info('webpack', 'HOT RELOAD: activated');
}
if (DEVTOOLS) {
  log.info('webpack', 'DEVTOOLS active');
}
if (!OPTIMIZE) {
  log.info('webpack', 'SOURCEMAPS activated');
}
if (FAIL_ON_ERROR) {
  log.info('webpack', 'NoErrorsPlugin disabled, build will fail on error');
}
if (OPTIMIZE) {
  log.info('webpack', 'OPTIMIZE: code will be compressed and deduped');
}
if( !(/^https?:\/\/.*(?!\/).$/.test(API_ROOT_URL)) ) {
  log.warn('webpack', 'Your API_ROOT_URL should not have any trailing slash');
}
log.info('webpack', `API_ROOT_URL ${API_ROOT_URL}`);

/** plugins setup */

if(!FAIL_ON_ERROR) {
  plugins.push(new webpack.NoErrorsPlugin());
}

if (DASHBOARD) {
  if (!MODE_DEV_SERVER) {
    log.error('webpackbuild', 'DASHBOARD=true should only be used in dev-server mode (not in build mode)');
    process.exit(1);
  }
  const Dashboard = require('webpack-dashboard');
  const DashboardPlugin = require('webpack-dashboard/plugin');
  const dashboard = new Dashboard();
  plugins.push(new DashboardPlugin(dashboard.setData));
}

plugins.push(new HtmlWebpackPlugin({
  title: 'Topheman - react-es6-redux',
  template: 'src/index.ejs', // Load a custom template
  inject: MODE_DEV_SERVER, // inject scripts in dev-server mode - in build mode, use the template tags
  MODE_DEV_SERVER: MODE_DEV_SERVER,
  DEVTOOLS: DEVTOOLS,
  BANNER_HTML: BANNER_HTML
}));
// extract css into one main.css file
plugins.push(new ExtractTextPlugin(`main${hash}.css`, {
  disable: false,
  allChunks: true
}));
plugins.push(new webpack.BannerPlugin(BANNER));
plugins.push(new webpack.DefinePlugin({
  // Lots of library source code (like React) are based on process.env.NODE_ENV
  // (all development related code is wrapped inside a conditional that can be dropped if equal to "production"
  // this way you get your own react.min.js build)
  'process.env':{
    'NODE_ENV': JSON.stringify(NODE_ENV),
    'DEVTOOLS': DEVTOOLS, // You can rely on this var in your code to enable specific features only related to development (that are not related to NODE_ENV)
    'SHOW_DEVTOOLS': SHOW_DEVTOOLS,
    'LINTER': LINTER, // You can choose to log a warning in dev if the linter is disabled
    'API_ROOT_URL': JSON.stringify(API_ROOT_URL), // The httpClient will rely on that (change it at will)
  }
}));

if (OPTIMIZE) {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true
    }
  }));
}

if (MODE_DEV_SERVER) {
  // webpack-dev-server mode
  if(LOCALHOST) {
    log.info('webpack', 'Check http://localhost:8080');
  }
  else {
    log.info('webpack', 'Check http://' + myLocalIp() + ':8080');
  }
}
else {
  // build mode
  log.info('webpackbuild', `rootdir: ${root}`);
  if (STATS) {
    //write infos about the build (to retrieve the hash) https://webpack.github.io/docs/long-term-caching.html#get-filenames-from-stats
    plugins.push(function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname, BUILD_DIR, DIST_DIR, "stats.json"),
          JSON.stringify(stats.toJson()));
      });
    });
  }
}

/** preloaders */

const preloaders = [];

if (LINTER) {
  log.info('webpack', 'LINTER ENABLED');
  preloaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  });
}
else {
  log.info('webpack', 'LINTER DISABLED');
}

/** webpack config */

var config = {
  bail: FAIL_ON_ERROR,
  entry: {
    'bundle': './src/bootstrap.js',
    'main': './src/style/main.scss'
  },
  output: {
    publicPath: '',
    filename: `[name]${hash}.js`,
    chunkFilename: `[id]${hash}.chunk.js`,
    path: BUILD_DIR + '/' + DIST_DIR
  },
  cache: true,
  debug: NODE_ENV === 'production' ? false : true,
  devtool: OPTIMIZE ? false : 'sourcemap',
  devServer: {
    host: LOCALHOST ? 'localhost' : myLocalIp(),
    quiet: DASHBOARD // should be true if dashboard is enabled
  },
  module: {
    preLoaders: preloaders,
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'//(MODE_DEV_SERVER && !TRAVIS ? 'react-hot!' : '') + 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader',
          'css-loader?sourceMap!sass-loader?sourceMap=true&sourceMapContents=true&outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
        )
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      },
      { test: /\.(png)$/, loader: 'url-loader?limit=' + ASSETS_LIMIT + '&name=assets/[hash].[ext]' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=' + ASSETS_LIMIT + '&mimetype=application/font-woff&name=assets/[hash].[ext]' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=' + ASSETS_LIMIT + '&mimetype=application/font-woff&name=assets/[hash].[ext]' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=' + ASSETS_LIMIT + '&mimetype=application/octet-stream&name=assets/[hash].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?&name=assets/[hash].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=' + ASSETS_LIMIT + '&mimetype=image/svg+xml&&name=assets/[hash].[ext]' }

    ]
  },
  plugins: plugins,
  node:{
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

module.exports = config;
