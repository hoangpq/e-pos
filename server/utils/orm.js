// read config from yaml
const {Pool} = require('pg');
const loadConfig = require('../utils/config');
const appConfig = loadConfig();
const pool = new Pool(appConfig.database);

exports.query = function ({table, fields = [], domain = []}) {
  if (!table || !fields.length) {
    throw new Error('Please make sure params is correct.');
  }
  // make query
  domain = domain.map(cond => cond.join(' '));
  const select = `SELECT ${fields.join(',')} FROM ${table} `;
  const where = domain.length ? `WHERE ${domain.join(' AND ')} ` : '';
  return pool.query(select + where);
};

exports.delete = function ({table, domain}) {
  if (!table || !domain.length) {
    throw new Error('Please make sure params is correct.');
  }
  domain = domain.map(cond => cond.join(' '));
  const deleteQuery = `DELETE FROM ${table} WHERE ${domain.join(' AND ')}`;
  return pool.query(deleteQuery);
};
