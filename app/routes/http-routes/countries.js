/**
 * @author Ivaylo Ivanov
 * @public
 * @class Countries
 * @description Sends a list of all countries
 * @see {@link https://github.com/esrol/esrol-server-app/wiki/Routes} for
 * further information.
 * @requires country-list
 */
'use strict';
let names = JSON.stringify({data: require('country-list')().getNames()});

class Countries {

  /**
  * @public
  * @static
  * @description Getter method for the route url endpoint
  * @returns {string} endpoint
  */
  static get url() {
    return '/countries';
  }

  /**
  * @public
  * @static
  * @description Receives all get requests to the route endpoint
  * and sends back the response
  * @param {object} req
  * @param {object} res
  */
  static getMultipleRecords(req, res) {
    res.end(names);
  }

}

module.exports = Countries;
