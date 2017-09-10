const fs = require('fs');
const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphQlRouter = express.Router();
// const {buildSchema} = require('graphql');
const graphqlTools = require('graphql-tools');
const {graphiqlExpress} = require('graphql-server-express');
const {loadProducts, getProduct, getUom} = require('../api/odoo');
const SOMETHING_CHANGED_TOPIC = 'something_changed';
const {
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType
} = require('graphql');

const Schema = fs.readFileSync(path.join(__dirname, './schema.graphqls')).toString();

const createProduct = function ({name, price}) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: `${name} - 2017`,
        price: ({vat = false}) => vat ? 1.5 * price : price,
      });
    }, 1000)
  })
};

const randomProduct = function () {
  return [1, 2, 3, 4].map((n) => {
    if (n % 2 === 0) {
      return {
        template_name: 'Template',
      }
    } else {
      return {
        name: 'Product',
        price: 10 * n,
      }
    }
  });
};

const randomChacrater = function () {
  const characters = [];
  characters.push({
    name: 'Jedi',
    starship: 'TIE Advanced x1',
  });
  characters.push({
    name: 'R2-D2',
    primaryFunction: 'Astromech',
  });
  return characters;
};

const resolverMap = {
  SearchResult: {
    __resolveType(obj, context, info) {
      if (obj.template_name) {
        return 'Template';
      }
      if (obj.price) {
        return 'Product';
      }
      return null;
    },
  },
  Character: {
    __resolveType(obj, context, info) {
      if (obj.starship) {
        return 'Human';
      }
      if (obj.primaryFunction) {
        return 'Droid';
      }
      return null;
    }
  },
  Query: {
    products(obj, {name, price}, context) {
      return loadProducts(name, price);
    },
  },
  Product: {
    name(obj) {
      return obj.name;
    },
    uom(obj) {
      return getUom(obj.uom_id);
    }
  },
  Subscription: {
    somethingChanged: {
      subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC),
    },
  }
};

const root = {
  // queries
  // products: ({name, price}) => loadProducts(name, price),
  product: ({id}) => getProduct(id),
  // mutations
  createProduct: createProduct,
  randomProduct: randomProduct,
  randomChacrater: randomChacrater,
};

// const schema = buildSchema(Schema);

const productType = new GraphQLObjectType({
  name: 'Product',
  description: 'Odoo product',
  fields: {
    name: {
      type: GraphQLString,
      description: 'The product name',
    },
    price: {
      type: GraphQLFloat,
      description: 'The product price',
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root of query type',
  fields: {
    products: {
      type: new GraphQLList(productType),
      description: 'List of products',
      resolve: () => loadProducts(),
    }
  },
});

const schema = new GraphQLSchema({
  query: queryType,
});

graphQlRouter.post('/graphql', graphqlHTTP({
  // The old way to invoke scheme
  /*schema: graphqlTools.makeExecutableSchema({
    typeDefs: Schema,
    resolvers: resolverMap,
  }),
  rootValue: root,*/
  schema: schema,
}));

const handler = graphiqlExpress({endpointURL: 'http://localhost:8080/graphql'});
graphQlRouter.get('/graphqli', handler);
module.exports = graphQlRouter;
