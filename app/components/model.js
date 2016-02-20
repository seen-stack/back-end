'use strict';
const Storage = require('./storage');
const Validator = require('jsonschema').Validator;
const validator = new Validator();

class Model {

  constructor(record) {
    this.record = record;
  }

  get record() {
    return this._record;
  }

  set record(record) {
    this._record = record;
  }

  validate() {
    return validator.validate(this.record.data.attributes, this.schema);
  }

  getAll() {
    return Storage.getAll(this.entity);
  }

  save() {
    if (this.record.data.id) {
      return this.update();
    }
    return Storage.create(this.entity, this.record.data.attributes);
  }

  update() {
    this.record.data.attributes.id = this.record.data.id;
    return Storage.update(this.entity, this.record.data.attributes);
  }

  delete(id) {
    return Storage.delete(this.entity, id);
  }

}

module.exports = Model;
