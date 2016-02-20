'use strict';
const fs = require('fs');
const path = require('path');
const cnf = new WeakMap();

class Config {

  static getConfig() {
    if (!cnf.config) {
      Config.readFile();
    }
    return cnf.config;
  }

  static readFile() {
    try {
      let confPath = path.join(__dirname, '..', 'config/config.json');
      cnf.config = JSON.parse(fs.readFileSync(confPath));
      cnf.config.appPath = path.join(__dirname, '..');
    } catch (e) {
      throw new Error('Config file is missing or corrupted, error: '
      + e.toString());
    }
  }

}

module.exports = Config;
