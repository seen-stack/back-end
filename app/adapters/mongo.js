'use strict';
const path = require('path');
const Autoloader = require('esrol-autoloader');
const config = require('../components/config');
const mongoose = require('mongoose');
const Logger = require('esrol-logger');
const logger = new Logger('components:contacts:mongo');
const schemas = new WeakMap();

class Mongo {

  static createClient(forceClient) {
    let storage = config.getConfig().storage;
    if (storage !== 'mongodb' || forceClient) {
      return;
    }
    mongoose.connect('mongodb://localhost/address_book');
    Mongo.getModels();
  }

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

  static registerSchemas(Module) {
    let model = new Module();
    let Schema = mongoose.Schema;
    let contactSchema = new Schema(model.schema.properties);
    contactSchema.virtual('id').get(function() {
      return this._id;
    });
    schemas[model.entity] = mongoose.model(model.entity, contactSchema);
  }

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
