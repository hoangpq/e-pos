const express = require('express');
const router = express.Router();
const {Pool} = require('pg');
const loadConfig = require('../utils/config');

// read config from yaml
const appConfig = loadConfig();
const pool = new Pool(appConfig.database);

router.get('/products', async(req, res) => {
  let products = await pool.query(
    'SELECT name, list_price as price FROM product_template'
  );
  res.json(products.rows);
});

module.exports = router;
