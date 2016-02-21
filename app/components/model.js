/**
 * @author Ivaylo Ivanov
 * @public
 * @class Model
 * @description Mixins class for the model state and behavior. It's interacting
 * with the choosed storage by calling the Storage module methods
 * @requires jsonschema
 * @requires ./storage
 */
'use strict';
const Storage = require('./storage');
const Validator = require('jsonschema').Validator;
const validator = new Validator();

class Model {

  /**
  * @public
  * @description Creates an instance and sets the record if passed
  * @params {object} record
  */
  constructor(record) {
    this.record = record;
  }

  /**
  * @public
  * @description Getter method for the current record
  * @returns {object} record
  */
  get record() {
    return this._record;
  }

  /**
  * @public
  * @description Setter method for the current record
  */
  set record(record) {
    this._record = record;
  }

  /**
  * @public
  * @description Validates the attributes of the current record using
  * it's schema
  * @return {object} result
  */
  validate() {
    return validator.validate(this.record.data.attributes, this.schema);
  }

  /**
  * @public
  * @description Retrieves all records for the current model
  * @return {object} promise
  */
  getAll() {
    return Storage.getAll(this.entity);
  }

  /**
  * @public
  * @description Save the current model. If it's an existing record - update it
  * - otherwise create a new record
  * @return {object} promise
  */
  save() {
    if (this.record.data.id) {
      return this.update();
    }
    return Storage.create(this.entity, this.record.data.attributes);
  }

  /**
  * @public
  * @description Updates the current record
  * @return {object} promise
  */
  update() {
    this.record.data.attributes.id = this.record.data.id;
    return Storage.update(this.entity, this.record.data.attributes);
  }

  /**
  * @public
  * @description Deletes the current record
  * @params {int|string} id|guid
  * @return {object} promise
  */
  delete(id) {
    return Storage.delete(this.entity, id);
  }

}

module.exports = Model;
