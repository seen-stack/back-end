'use strict';
const Logger = require('esrol-logger');
const path = require('path');
Logger.setLogDir(path.join(__dirname, '..', 'logs'));

class LoggerInitializer {

  static get priority() {
    return 1;
  }

}

module.exports = LoggerInitializer;
