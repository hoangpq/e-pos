// for react hot reload
const webpack = require('webpack');
const express = require('express');
const apiRouter = require('./api/odoo');
const graphQlRouter = require('./graphql');

const PORT = process.env.PORT || 3000;
const config = require('./config/webpack.dev')(PORT);

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/api', graphQlRouter);

app.listen(PORT, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening on port ${PORT}`);
});
