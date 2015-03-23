'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    bundle: "./src/components/App.jsx",
    main: "./src/style/main.scss"
  },
  output: {
    path: './build/assets',
    publicPath: "/assets/",
    filename: "js/[name].js"
  },
  devtool: "#inline-source-map",
  devServer: {
    contentBase: './public'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      }
    ]
  },
  plugins: [
    // extract inline css into separate 'styles.css'
    new ExtractTextPlugin('css/[name].css')
  ]
};