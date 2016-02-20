'use strict';
const Logger = require('esrol-logger');
const logger = new Logger('http-routes:client-errors');

class ClientErrors {

  static get url() {
    return '/client-errors';
  }

  static postMultipleRecords(req, res) {
    logger.error(req.query.error);
    res.statusCode = 201;
    res.end();
  }

}

module.exports = ClientErrors;
