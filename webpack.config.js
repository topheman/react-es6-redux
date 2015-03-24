'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


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
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    //// extract inline css into separate 'styles.css'
    new ExtractTextPlugin('[name]'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};