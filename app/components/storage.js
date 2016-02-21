/**
 * @author Ivaylo Ivanov
 * @public
 * @class Storage
 * @description Interacting with the choosed storage, utilizes the factory
 * pattern. Wrapper of all available methods for communication between the app
 * and the storage
 * @requires esrol-logger
 * @requires ../adapters/memory
 * @requires ../adapters/mongo
 * @requires ./config
 */
'use strict';
const Memory = require('../adapters/memory');
const Mongo = require('../adapters/mongo');
const config = require('./config').getConfig().storage;
const Logger = require('esrol-logger');
const logger = new Logger('components:contacts:contacts');
let currentStorage;

class Storage {

  /**
  * @public
  * @static
  * @description Sets the choosed storage. Follback to memory if needed
  */
  static setStorage() {
    switch (config) {
    case 'memory':
      currentStorage = Memory;
      logger.info('Use "memory" as a storage');
      break;
    case 'mongodb':
      currentStorage = Mongo;
      logger.info('Use "mongodb" as a storage');
      break;
    // more storages
    default:
      logger.warning(`Unknown storage $config, follback to "memory"`);
    }
  }

  /**
  * @public
  * @static
  * @description Change the choosed storage in runtime
  */
  static changeStorage(storage) {
    currentStorage = storage;
  }

  /**
  * @public
  * @static
  * @description Creates a record
  * @param {string} entity - representation of the current model
  * @param {object} record
  * @returns {object} promise
  */
  static create(entity, record) {
    return currentStorage.create(entity, record);
  }

  /**
  * @public
  * @static
  * @description Gets all records
  * @param {string} entity - representation of the current model
  * @returns {object} promise
  */
  static getAll(entity) {
    return currentStorage.getAll(entity);
  }

  /**
  * @public
  * @static
  * @description Updates a record
  * @param {string} entity - representation of the current model
  * @param {object} record
  * @returns {object} promise
  */
  static update(entity, record) {
    return currentStorage.update(entity, record);
  }

  /**
  * @public
  * @static
  * @description Deletes a record
  * @param {string} entity - representation of the current model
  * @param {int|string} id|guid
  * @returns {object} promise
  */
  static delete(entity, id) {
    return currentStorage.delete(entity, id);
  }

}

module.exports = Storage;
