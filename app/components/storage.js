'use strict';
const Memory = require('../adapters/memory');
const Mongo = require('../adapters/mongo');
const config = require('./config').getConfig().storage;
const Logger = require('esrol-logger');
const logger = new Logger('components:contacts:contacts');
let currentStorage;

class Storage {

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

  static changeStorage(storage) {
    currentStorage = storage;
  }

  static create(entity, record) {
    return currentStorage.create(entity, record);
  }

  static getAll(entity) {
    return currentStorage.getAll(entity);
  }

  static update(entity, record) {
    return currentStorage.update(entity, record);
  }

  static delete(entity, id) {
    return currentStorage.delete(entity, id);
  }

}

module.exports = Storage;
