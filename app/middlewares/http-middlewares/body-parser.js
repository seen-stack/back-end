/**
 * @author Ivaylo Ivanov
 * @public
 * @class BodyParser
 * @description Sets the body-parser as a middleware
 * @see {@link https://github.com/esrol/esrol-server-app/wiki/Middlewares} for
 * further information.
 * @requires body-parser
 */
'use strict';
const parser = require('body-parser').json({type: 'application/vnd.api+json'});

class BodyParser {

  /**
  * @public
  * @static
  * @description Getter method for the middleware priority
  * @returns {int} number
  */
  static get priority() {
    return 2;
  }

  /**
  * @public
  * @description Middleware function that will be called on request
  * @returns {function} middleware function
  */
  static onRequest(req, res, next) {
    req.headers['content-type'] = 'application/vnd.api+json';
    return parser(req, res, next);
  }

}

module.exports = BodyParser;
