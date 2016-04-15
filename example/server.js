var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  colors:true,
  contentBase: __dirname
}).listen(12345, '172.16.70.58', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://172.16.70.58:12345/');
});
