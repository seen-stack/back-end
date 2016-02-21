/**
 * @author Ivaylo Ivanov
 * @public
 * @class Contacts
 * @description Serializes and validates the request from the route to the
 * model and returns back the result to the route
 * @requires jsonapi-serializer
 * @requires ../models/contacts
 */
'use strict';
const JSONAPISerializer = require('jsonapi-serializer');
const Model = require('../models/contacts');

class Contacts {


  /**
  * @public
  * @static
  * @description Gets all records for this model, serializes and returns them
  * @returns {object} promise
  */
  static all() {
    return new Promise(resolve => {
      return resolve(new Model().getAll());
    })
    .then(contacts => {
      contacts = new JSONAPISerializer('contacts', contacts, {
        attributes: ['first-name', 'last-name', 'email', 'country']
      });
      return contacts;
    });
  }

  /**
  * @public
  * @static
  * @description Creates new record for this model
  * @param {object} record
  * @returns {object} promise
  */
  static create(contact) {
    return new Promise((resolve, reject) => {
      if (!contact || !contact.data || !contact.data.attributes) {
        return reject('bad request');
      }
      let record = new Model(contact);
      let errors = record.validate().errors;
      if (!errors.length) {
        return resolve(record.save());
      }
      reject(errors);
    })
    .then(id => {
      return new JSONAPISerializer('contact', {id: id}, {attributes: []});
    });
  }

  /**
  * @public
  * @static
  * @description Updates the record
  * @param {int|string} id or guid
  * @param {object} record
  * @returns {object} promise
  */
  static update(id, contact) {
    return new Promise((resolve, reject) => {
      if (!contact || !contact.data || !contact.data.attributes) {
        return reject('bad request');
      }
      contact.data.id = id;
      let record = new Model(contact);
      let errors = record.validate().errors;
      if (!errors.length) {
        return resolve(record.save());
      }
      reject(errors);
    })
    .then(() => {
      return new JSONAPISerializer('contacts', {id: id}, {attributes: []});
    });
  }

  /**
  * @public
  * @static
  * @description Deletes the record
  * @param {int|string} id or guid
  * @returns {object} promise
  */
  static delete(id) {
    return new Promise(resolve => {
      return resolve(new Model().delete(id));
    })
    .then(() => {
      return new JSONAPISerializer('contacts', [], {attributes: []});
    });
  }

}

module.exports = Contacts;
