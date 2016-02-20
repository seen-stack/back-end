'use strict';
const JSONAPISerializer = require('jsonapi-serializer');
const Model = require('../models/contacts');

class Contacts {

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
      let id = contact.data.id;
      return new JSONAPISerializer('contacts', {id: id}, {attributes: []});
    });
  }

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
