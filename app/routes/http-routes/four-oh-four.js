/**
 * @author Ivaylo Ivanov
 * @public
 * @class Countries
 * @description Receives all request that cannot be handled (not matching) by
 * the existing app endpoints.
 * @see {@link https://github.com/esrol/esrol-server-app/wiki/Routes#404} for
 * further information.
 */
'use strict';

class FourOhFour {

  /**
  * @public
  * @static
  * @description Getter method for the route url endpoint
  * @returns {string} endpoint
  */
  static get url() {
    return '/fourOhFour';
  }

  /**
  * @public
  * @static
  * @description Receives all the requests of any type when the request's
  * endpoint is not matching any of the existing ones / 404
  * @param {object} req
  * @param {object} res
  */
  static all(req, res) {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, PUST, OPTIONS, PATCH');
      res.statusCode = 204;
      return res.end();
    }
    res.statusCode = 404;
    return res.end();
  }

}

module.exports = FourOhFour;
