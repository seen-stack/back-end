'use strict';
const Logger = require('esrol-logger');
const logger = new Logger('components:records:memory');
const weakMap = new WeakMap();

class Memory {

  static getAll(entity) {
    logger.debug('getAll', entity);
    weakMap[entity] = weakMap[entity] || [];
    return new Promise(resolve => {
      let records = [];
      weakMap[entity].map(record => {
        if (!record.deleted) {
          records.push(record);
        }
      });
      resolve(records);
    });
  }

  static create(entity, record) {
    logger.debug('create', entity, record);
    weakMap[entity] = weakMap[entity] || [];
    return new Promise(resolve => {
      record.id = weakMap[entity].length + 1;
      weakMap[entity].push(record);
      resolve(record.id);
    });
  }

  static delete(entity, id) {
    logger.debug('delete', entity, id);
    weakMap[entity] = weakMap[entity] || [];
    return new Promise(resolve => {
      if (weakMap[entity][id - 1]) {
        weakMap[entity][id - 1].deleted = true;
      }
      resolve();
    });
  }

  static update(entity, record) {
    logger.debug('update', entity, record);
    weakMap[entity] = weakMap[entity] || [];
    return new Promise(resolve => {
      weakMap[entity][record.id - 1] = record;
      resolve();
    });
  }

}

module.exports = Memory;
