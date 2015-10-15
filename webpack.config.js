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

if(process.env.PROD){
  console.log('PRODUCTION mode');
}
else if(process.env.TEST){
  console.log('TEST mode');
  mockObjects = true;
}
else if(process.env.MOCK){
  console.log('MOCK mode');
  mockObjects = true;
}
else{
  console.log('DEVELOPMENT mode');
}

/** before build */

//in build mode, cleanup build folder before
if(MODE_DEV_SERVER === false){
  console.log('Cleaning ...');
  var deleted = require('del').sync(['build/*','build/**/*',"!.git/**/*"]);
  deleted.forEach(function(e){
    console.log(e);
  });
}

/** plugins setup */

plugins.push(new webpack.HotModuleReplacementPlugin());//@todo remove hmr and others on production builds
plugins.push(new webpack.NoErrorsPlugin());
// extract css into one main.css file
plugins.push(new ExtractTextPlugin('css/main.css',{
  disable: false,
    allChunks: true
}));
plugins.push(new webpack.BannerPlugin(common.getBanner()));

if(process.env.PROD){
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true
    }
  }));
}

/** webpack config */

var resolve = {
  alias : {}
};
//only used browser side
resolve.alias['httpServiceConfiguration'] = path.resolve(__dirname, './src/services/httpService/config/environment/config' + (process.env.PROD ? '.build' : (process.env.MOCK ? '.mock' : '.dev' ) ) + '.js');

module.exports = {
  entry: {
    "js/bundle": [
      'webpack/hot/only-dev-server',
      "./src/bootstrap.jsx"
    ],
    "css/main": "./src/style/main.scss"
  },
  output: {
    publicPath: "/assets/",
    filename: "[name].js",
    path: "./build/assets"
  },
  cache: true,
  debug: process.env.PROD ? false : true,
  devtool: process.env.PROD ? false : "sourcemap",
  devServer: {
    contentBase: './public',
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel-loader'
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