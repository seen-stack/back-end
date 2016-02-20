'use strict';
const ContactsController = require('../../controllers/contacts');
const Logger = require('esrol-logger');
const logger = new Logger('http-routes:contacts');

class Contacts {

  static get url() {
    return '/contacts';
  }

  static getMultipleRecords(req, res) {
    ContactsController.all()
    .then(contacts => {
      res.json(contacts);
    })
    .catch(error => {
      Contacts.onError(error, res, 'getMultipleRecords');
    });
  }

  static patchSingleRecord(req, res) {
    ContactsController.update(req.record, req.body)
    .then(contacts => {
      res.statusCode = 204;
      res.json(contacts);
    })
    .catch(error => {
      Contacts.onError(error, res, 'putSingleRecord');
    });
  }

  static postMultipleRecords(req, res) {
    ContactsController.create(req.body)
    .then(contacts => {
      res.statusCode = 201;
      res.json(contacts);
    })
    .catch(error => {
      Contacts.onError(error, res, 'postSingleRecord');
    });
  }

  static deleteSingleRecord(req, res) {
    ContactsController.delete(req.record)
    .then(contacts => {
      res.statusCode = 204;
      res.json(contacts);
    })
    .catch(error => {
      Contacts.onError(error, res, 'deleteSingleRecord');
    });
  }

  static onError(error, res, method, info) {
    let message = 'Error while processing %s. Error: %s, stack: %s, info: %s';
    info = info || '';
    res.statusCode = 500;
    res.end();
    logger.error(
      message,
      method,
      error,
      error.stack,
      info
    );
  }

}

module.exports = Contacts;
