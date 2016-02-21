/**
 * @author Ivaylo Ivanov
 * @public
 * @class SetStorage
 * @description Sets a storage for the current app instance
 * @see {@link https://github.com/esrol/esrol-server-app/wiki/Initializers} for
 * further information.
 * @requires Storage
 */
'use strict';
const Storage = require('../components/storage');

class SetStorage {

  /**
  * @public
  * @description Calls the setStorage method
  */
  constructor() {
    Storage.setStorage();
  }

  /**
  * @public
  * @static
  * @description Getter method for the initializer priority
  * @returns {int} number
  */
  static get priority() {
    return 3;
  }

}

module.exports = SetStorage;
