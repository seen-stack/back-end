/**
 * @author Ivaylo Ivanov
 * @public
 * @class Headers
 * @description Sets headers to the request and/or response
 * @see {@link https://github.com/esrol/esrol-server-app/wiki/Middlewares} for
 * further information.
 */
'use strict';

class Headers {

  /**
  * @public
  * @static
  * @description Getter method for the middleware priority
  * @returns {int} number
  */
  static get priority() {
    return 1;
  }

  /**
  * @public
  * @description Middleware function that will be called on request
  * @returns {function} middleware function
  */
  static onRequest(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
  }

}

module.exports = Headers;
