const fs = require('fs');
const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphQlRouter = express.Router();
const {loadProducts, getProduct, getUom} = require('../api/odoo');
const {
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInterfaceType,
} = require('graphql');

// const Schema = fs.readFileSync(path.join(__dirname, './schema.graphqls')).toString();


// Character
const characterInterface = new GraphQLInterfaceType({
  name: 'Character',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
  resolveType(obj, context, info) {
    if (obj.starship) {
      return 'Human';
    }
    if (obj.primaryFunction) {
      return 'Droid';
    }
    return null;
  }
});

// Human
const humanType = new GraphQLObjectType({
  name: 'Human',
  interfaces: [characterInterface],
  fields: {
    name: {
      type: GraphQLString,
      description: 'The human name',
    },
    starship: {
      type: GraphQLString,
      description: 'The human\'s starship',
    },
  }
});

// Droid
const droidType = new GraphQLObjectType({
  name: 'Droid',
  interfaces: [characterInterface],
  fields: {
    name: {
      type: GraphQLString,
      description: 'The droid name',
    },
    primaryFunction: {
      type: GraphQLString,
      description: 'The droid primary function',
    },
  }
});

// UOM
const uomType = new GraphQLObjectType({
  name: 'Uom',
  description: 'Odoo product uom',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Product uom id',
    },
    name: {
      type: GraphQLString,
      description: 'Product uom name',
    },
  }
});

// Product
const productType = new GraphQLObjectType({
  name: 'Product',
  description: 'Odoo product',
  fields: {
    name: {
      type: GraphQLString,
      description: 'The product name',
      resolve: (obj, params, context) => {
        return obj.name;
      },
    },
    price: {
      type: GraphQLFloat,
      description: 'The product price',
    },
    uom: {
      type: uomType,
      description: 'The product uom',
      resolve: (obj) => getUom(obj.uom_id),
    }
  }
});

// Query
const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root of query type',
  fields: {
    products: {
      type: new GraphQLList(productType),
      description: 'List of products',
      args: {
        price: {
          name: 'Price of the product',
          type: GraphQLFloat,
        },
        name: {
          name: 'Name of the product',
          type: GraphQLString,
        },
      },
      resolve: (obj, { name, price }, context) => loadProducts(name, price),
    },
    product: {
      type: productType,
      description: 'Get single product',
      resolve: ({id}) => getProduct(id),
    },
    characters: {
      type: new GraphQLList(characterInterface),
      description: 'List of character',
      resolve: () => {
        return new Promise((resolve) => {
          const characters = [
            {
              name: 'Jedi',
              starship: 'TIE Advanced x1',
            }, {
              name: 'R2-D2',
              primaryFunction: 'Astromech',
            }
          ];
          resolve(characters);
        })
      },
    }
  },
});

const schema = new GraphQLSchema({
  query: queryType,
  types: [
    productType,
    humanType,
    droidType,
  ],
});

graphQlRouter.post('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: false,
}));

graphQlRouter.get('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

module.exports = graphQlRouter;
