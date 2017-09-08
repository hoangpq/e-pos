const {Pool} = require('pg');
const loadConfig = require('../utils/config');

// read config from yaml
const appConfig = loadConfig();
const pool = new Pool(appConfig.database);

exports.loadProducts = function (name) {
  return pool
    .query(`
      SELECT name, list_price as price 
      FROM product_template 
      ${name ? `WHERE name like '%${name}%'` : ''}
    `)
    .then(result => result.rows);
};
