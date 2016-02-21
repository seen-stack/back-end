/**
 * @author Ivaylo Ivanov
 * @public
 * @class ClientErrors
 * @description Logs errors from client (Ember.js app)
 * @see {@link https://github.com/esrol/esrol-server-app/wiki/Routes} for
 * further information.
 * @requires esrol-logger
 */
'use strict';
const Logger = require('esrol-logger');
const logger = new Logger('http-routes:client-errors');

class ClientErrors {

  /**
  * @public
  * @static
  * @description Getter method for the route url endpoint
  * @returns {string} endpoint
  */
  static get url() {
    return '/client-errors';
  }

  /**
  * @public
  * @static
  * @description Receives all post requests to the route endpoint
  * and logs the received error message
  * @param {object} req
  * @param {object} res
  */
  static postMultipleRecords(req, res) {
    logger.error(req.query.error);
    res.statusCode = 201;
    res.end();
  }

}

module.exports = ClientErrors;
