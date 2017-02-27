var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  colors:true,
  contentBase: __dirname
}).listen(12345, '127.0.0.1', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://127.0.0.1:12345/');
});
