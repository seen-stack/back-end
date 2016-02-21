/**
 * @author Ivaylo Ivanov
 * @public
 * @class LoggerInitializer
 * @description Initializes the logger module by setting a log dir
 * @see {@link https://github.com/esrol/esrol-server-app/wiki/Initializers} for
 * further information.
 * @requires path
 * @requires esrol-logger
 */
'use strict';
const Logger = require('esrol-logger');
const path = require('path');
Logger.setLogDir(path.join(__dirname, '..', 'logs'));

class LoggerInitializer {

  /**
  * @public
  * @static
  * @description Getter method for the initializer priority
  * @returns {int} number
  */
  static get priority() {
    return 1;
  }

}

module.exports = LoggerInitializer;
