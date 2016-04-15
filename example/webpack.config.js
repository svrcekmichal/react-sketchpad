var path = require('path');
var webpack = require( "webpack" );

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'webpack-dev-server/client?http://172.16.70.58:12345',
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'index.js')
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/build',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  progress: true,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot','babel'],
      exclude: path.join(__dirname, 'node_modules')
    }]
  },
  resolve: {
    root: path.join(__dirname, 'node_modules'),
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
};
