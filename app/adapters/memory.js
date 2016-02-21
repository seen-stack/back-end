/**
 * @author Ivaylo Ivanov
 * @public
 * @class Memory
 * @description Memory storage. Keeps all of the records into
 * the memory (WeakMap)
 * @requires esrol-logger
 */
'use strict';
const Logger = require('esrol-logger');
const logger = new Logger('components:records:memory');
const weakMap = new WeakMap();

class Memory {

  /**
  * @public
  * @static
  * @description Gets all records
  * @param {string} entity - representation of the current model
  * @returns {object} promise
  */
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

  /**
  * @public
  * @static
  * @description Creates a record
  * @param {string} entity - representation of the current model
  * @param {object} record
  * @returns {object} promise
  */
  static create(entity, record) {
    logger.debug('create', entity, record);
    weakMap[entity] = weakMap[entity] || [];
    return new Promise(resolve => {
      record.id = weakMap[entity].length + 1;
      weakMap[entity].push(record);
      resolve(record.id);
    });
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
    logger.debug('delete', entity, id);
    weakMap[entity] = weakMap[entity] || [];
    return new Promise(resolve => {
      if (weakMap[entity][id - 1]) {
        weakMap[entity][id - 1].deleted = true;
      }
      resolve();
    });
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
    logger.debug('update', entity, record);
    weakMap[entity] = weakMap[entity] || [];
    return new Promise(resolve => {
      weakMap[entity][record.id - 1] = record;
      resolve();
    });
  }

}

module.exports = Memory;
