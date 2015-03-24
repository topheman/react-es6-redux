'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var plugins = [];
plugins.push(new ExtractTextPlugin('[name]'))// extract inline css into separate 'styles.css' file
//dont active HMR on build for production
if(!process.env.BUILD){
  plugins.push(new webpack.HotModuleReplacementPlugin());
}
plugins.push(new webpack.NoErrorsPlugin());

module.exports = {
  entry: {
    "js/bundle.js": [
      'webpack/hot/only-dev-server',
      "./src/components/App.jsx"
    ],
    "css/main.css": "./src/style/main.scss"
  },
  output: {
    publicPath: "/assets/",
    filename: "[name]",
    path: "./build/assets"
  },
  cache: true,
  debug: true,
  devtool: false,
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
        test: /\.scss/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?outputStyle=expanded&" +
        "includePaths[]=" + (path.resolve(__dirname, "./node_modules")) )
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      },
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: plugins
};