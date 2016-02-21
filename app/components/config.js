/**
 * @author Ivaylo Ivanov
 * @public
 * @class Config
 * @description Reads the config file and returns it as an object
 * @requires fs
 * @requires path
 */
'use strict';
const fs = require('fs');
const path = require('path');
const cnf = new WeakMap();

class Config {

  /**
  * @public
  * @static
  * @description Returns a config object
  * @returns {object} config
  */
  static getConfig() {
    if (!cnf.config) {
      Config.readFile();
    }
    return cnf.config;
  }

  /**
  * @public
  * @static
  * @description Reads the config file
  * @throws {error} the file is missing or corrupted
  */
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
