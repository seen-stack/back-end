/**
 * @author Ivaylo Ivanov
 * @public
 * @class Mongo
 * @description Initializes the Mongo adapter by creating a client
 * @see {@link https://github.com/esrol/esrol-server-app/wiki/Initializers} for
 * further information.
 * @requires Mongo
 */
'use strict';
const Mongo = require('../adapters/mongo');

class MongoAdapter {

  /**
  * @public
  * @description Calls createClient method for creating a client for mongodb
  */
  constructor() {
    Mongo.createClient();
  }

  /**
  * @public
  * @static
  * @description Getter method for the initializer priority
  * @returns {int} number
  */
  static get priority() {
    return 2;
  }

}

module.exports = MongoAdapter;
