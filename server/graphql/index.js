const fs = require('fs');
const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphQlRouter = express.Router();
const {graphql, buildSchema} = require('graphql');
const {graphiqlExpress} = require('graphql-server-express');
const {loadProducts, findProduct} = require('../api/odoo');

const Schema = fs.readFileSync(path.join(__dirname, './schema.graphqls')).toString();

const root = {
  // queries
  products: ({name}) => loadProducts(name),
};

const schema = buildSchema(Schema);

graphQlRouter.post('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
}));

graphQlRouter.get('/graphqli', graphiqlExpress({
  endpointURL: '/api/graphql'
}));

module.exports = graphQlRouter;
