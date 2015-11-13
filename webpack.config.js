'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var mockObjects = false;
var common = require('./common');
var plugins = [];
var MODE_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') > -1 ? true : false;

console.log('Launched in ' + (MODE_DEV_SERVER ? 'dev-server' : 'build') + ' mode');

/** environment setup */

var env = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'dev';
var devtools = process.env.DEVTOOLS ? JSON.parse(process.env.DEVTOOLS) : false;
if(env === 'production'){
  console.log('PRODUCTION mode');
}
else if(env === 'test'){
  console.log('TEST mode');
  mockObjects = true;
}
else if(env === 'mock'){
  console.log('MOCK mode');
  mockObjects = true;
}
else{
  console.log('DEVELOPMENT mode');
}
if(devtools){
  console.log('DEVTOOLS active');
}

/** before build */

var hash = (env === 'production' && devtools ? '-devtools' : '') + (env === 'production' ? '-[hash]' : '');

//in build mode, cleanup build folder before - since we can build two versions (production & devtools) in a row, skip delete for the devtools
if(MODE_DEV_SERVER === false && devtools === false){
  console.log('Cleaning ...');
  var deleted = require('del').sync(['build/*','build/**/*',"!.git/**/*"]);
  deleted.forEach(function(e){
    console.log(e);
  });
}
else if(MODE_DEV_SERVER === false && devtools === true){
  console.log('[INFO] Not cleaning up build/ folder for this pass (not in devtools mode)');
}

/** plugins setup */

plugins.push(new webpack.NoErrorsPlugin());
// extract css into one main.css file
plugins.push(new ExtractTextPlugin('css/main' + hash + '.css',{
  disable: false,
    allChunks: true
}));
plugins.push(new webpack.BannerPlugin(common.getBanner()));
plugins.push(new webpack.DefinePlugin({
  // React library code is based on process.env.NODE_ENV (all development related code is wrapped inside
  // a conditional that can be dropped if equal to "production" - this way you get your own react.min.js build)
  'process.env':{
    'NODE_ENV': JSON.stringify(env),
    'DEVTOOLS': devtools // I rely on the variable bellow to make a bundle with the redux devtools (or not)
  }
}));

if(env === 'production' && devtools !== true){
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress:{
      warnings: true
    }
  }));
}

if(MODE_DEV_SERVER === false){
  //write infos about the build (to retrieve the hash) https://webpack.github.io/docs/long-term-caching.html#get-filenames-from-stats
  plugins.push(function() {
    this.plugin("done", function(stats) {
      require("fs").writeFileSync(
        path.join(__dirname, "build", "stats.json"),
        JSON.stringify(stats.toJson()));
    });
  });
}

/** webpack config */

var resolve = {
  alias : {}
};
//only used browser side
resolve.alias['httpServiceConfiguration'] = path.resolve(__dirname, './src/services/httpService/config/environment/config' + (env === 'production' ? '.build' : (env === 'mock' ? '.mock' : '.dev' ) ) + '.js');

var config = {
  entry: {
    "js/bundle": [
      'webpack/hot/only-dev-server',//removed on build mode
      "./src/bootstrap.jsx"
    ],
    "css/main": "./src/style/main.scss"
  },
  output: {
    publicPath: "/assets/",
    filename: "[name]" + hash + ".js",
    path: "./build/assets"
  },
  cache: true,
  debug: env === 'production' ? false : true,
  devtool: devtools ? "sourcemap" : false,
  devServer: {
    contentBase: './public',
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel-loader?stage=1'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract("style-loader",
          "css-loader?sourceMap!sass-loader?sourceMap=true&sourceMapContents=true&outputStyle=expanded&" +
          "includePaths[]=" + (path.resolve(__dirname, "./node_modules"))
        )
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      },
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  resolve: resolve,
  plugins: plugins
};

if(MODE_DEV_SERVER === false){
  //remove 'webpack/hot/only-dev-server' on build
  config.entry["js/bundle"].shift();
}

module.exports = config;