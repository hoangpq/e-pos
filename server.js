// for react hot reload
const webpack = require('webpack');
const express = require('express');

const PORT = process.env.PORT || 3000;
const config = require('./config/webpack.dev')(PORT);
require('./config/webpack.dev').a;

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(PORT, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening on port ${PORT}`);
});
