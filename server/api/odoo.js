const {query} = require('../utils/orm');
const memoize = require('lodash/memoize');

exports.loadProducts = function (name, price) {
  const domain = [];
  name && domain.push(['name', 'like', `%${name}%`]);
  price && domain.push(['list_price', '>=', price]);
  return query({
    table: 'product_template',
    fields: [
      'name',
      'list_price as price',
      'type',
      'uom_id',
    ],
    domain: domain,
  })
    .then(result => result.rows);
};

exports.getProduct = function (id) {
  return query({
    table: 'product_template',
    fields: [
      'name as template_name',
      'list_price as price',
      'type',
      'uom_id',
    ],
    domain: [['id', '=', id,]],
  })
    .then(result => {
      const rows = result.rows;
      return rows && rows.length
        ? rows[0] : null;
    })
};

exports.getUom = memoize(function (id) {
  console.log('Request to API');
  return query({
    table: 'product_uom',
    fields: [
      'id',
      'name'
    ],
    domain: [['id', '=', id]],
  })
    .then(result => result.rows[0]);
});
