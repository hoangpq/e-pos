const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../config/app.yaml');

module.exports = function loadConfig() {
  let config = null;
  try {
    config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
  } catch (e) {
    throw e;
  }
  return config;
};
