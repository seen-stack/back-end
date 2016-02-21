/**
 * @author Ivaylo Ivanov
 * @public
 * @class Mongo
 * @description MongoDB storage. Interacts with the mongoose module
 * @requires path
 * @requires esrol-autoloader
 * @requires mongoose
 * @requires esrol-logger
 * @requires ../components/config
 */
'use strict';
const path = require('path');
const Autoloader = require('esrol-autoloader');
const mongoose = require('mongoose');
const Logger = require('esrol-logger');
const config = require('../components/config');
const logger = new Logger('components:contacts:mongo');
// holds all the schemas of the models
const schemas = new WeakMap();

class Mongo {

  /**
  * @public
  * @static
  * @description Connects to the MongoDB (if activated from the config.json)
  * and calls the getModels method
  */
  static createClient(forceClient) {
    let storage = config.getConfig().storage;
    if (storage !== 'mongodb' || forceClient) {
      return;
    }
    mongoose.connect('mongodb://localhost/address_book');
    Mongo.getModels();
  }

  /**
  * @public
  * @static
  * @description Load all models in ../models, then calls the registerSchemas
  */
  static getModels() {
    let settings = {
      getAsObject: true,
      path: path.join(config.getConfig().appPath, 'models')
    };
    let modules = new Autoloader(settings).app;
    for (let moduleName in modules) {
      Mongo.registerSchemas(modules[moduleName]);
    }
  }

  /**
  * @public
  * @static
  * @description Creates an instance of the current model, creates a mongo
  * schema and register a virtual id property for this model
  */
  static registerSchemas(Module) {
    let model = new Module();
    let Schema = mongoose.Schema;
    let contactSchema = new Schema(model.schema.properties);
    contactSchema.virtual('id').get(function() {
      return this._id;
    });
    schemas[model.entity] = mongoose.model(model.entity, contactSchema);
  }

  /**
  * @public
  * @static
  * @description Gets all records
  * @param {string} entity - representation of the current model
  * @returns {object} promise
  */
  static getAll(entity) {
    logger.debug('getAll', entity);
    return new Promise((resolve, reject) => {
      let Shcema = schemas[entity];
      Shcema.find({}, (err, records) => {
        if (!err) {
          let results = [];
          records.map(record => {
            record = record.toObject();
            record.id = record._id;
            results.push(record);
          });
          return resolve(results);
        }
        reject(err);
      });
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
    return new Promise((resolve, reject) => {
      let Shcema = schemas[entity];
      let doc = new Shcema(record);
      doc.save(err => {
        if (!err) {
          return resolve(doc.id);
        }
        reject(err);
      });
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
    return new Promise((resolve, reject) => {
      let Shcema = schemas[entity];
      Shcema.remove({_id: id}, err => {
        if (!err) {
          return resolve();
        }
        reject(err);
      });
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
    return new Promise((resolve, reject) => {
      let Shcema = schemas[entity];
      Shcema.update({_id: record.id}, record, err => {
        if (!err) {
          return resolve();
        }
        reject(err);
      });
    });
  }

}

module.exports = Mongo;
