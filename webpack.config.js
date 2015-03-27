'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

if(process.env.PROD){
  console.log('PRODUCTION mode');
}
else{
  console.log('DEVELOPMENT mode');
}

var plugins = [];
plugins.push(new ExtractTextPlugin('[name]'))// extract inline css into separate 'styles.css' file
plugins.push(new webpack.HotModuleReplacementPlugin());//@todo remove hmr and others on production builds
plugins.push(new webpack.NoErrorsPlugin());

var resolve = {
  alias : {}
};
if(process.env.PROD){
  resolve.alias['routes.jsx'] = path.resolve(__dirname, './src/routes.build.jsx');
}
else{
  resolve.alias['routes.jsx'] = path.resolve(__dirname, './src/routes.jsx');
}

module.exports = {
  entry: {
    "js/bundle.js": [
      'webpack/hot/only-dev-server',
      "./src/bootstrap.jsx"
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
  resolve: resolve,
  plugins: plugins
};