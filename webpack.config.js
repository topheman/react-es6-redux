module.exports = {
  entry: "./src/components/App.jsx",
  output: {
    path: './build/js',
    publicPath: "/js/",
    filename: "bundle.js"
  },
  devtool: "#inline-source-map",
  devServer: {
    contentBase: './public'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
};