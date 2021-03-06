// for react hot reload
const webpack = require('webpack');
const express = require('express');
const { graphQlRouter, schema } = require('./graphql');
const SubscriptionServer = require('subscriptions-transport-ws').SubscriptionServer;
const {execute, subscribe} = require('graphql');
const {query} = require('./utils/orm');

const PORT = process.env.PORT || 3000;
const config = require('./config/webpack.dev')(PORT);

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/api', graphQlRouter);

// pre-load data
(async function () {

  global.product_uoms = await query({
    table: 'product_uom',
    fields: [
      'id',
      'name'
    ]
  })
    .then(result => {
      const uom_objs = {};
      result.rows.forEach((uom) => {
        uom_objs[uom.id] = uom.name;
      });
      return uom_objs;
    });

  app.listen(PORT, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log(`Listening on port ${PORT}`);
  });
})();
