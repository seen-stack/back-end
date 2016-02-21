/**
 * @author Ivaylo Ivanov
 * @public
 * @class Contacts
 * @description Receives and dispatches all requests to the controller
 * @see {@link https://github.com/esrol/esrol-server-app/wiki/Routes} for
 * further information.
 * @requires esrol-logger
 * @requires ../../controllers/contacts
 */
'use strict';
const ContactsController = require('../../controllers/contacts');
const Logger = require('esrol-logger');
const logger = new Logger('http-routes:contacts');

class Contacts {

  /**
  * @public
  * @static
  * @description Getter method for the route url endpoint
  * @returns {string} endpoint
  */
  static get url() {
    return '/contacts';
  }

  /**
  * @public
  * @static
  * @description Receives all get requests to the route endpoint,
  * calls the controller's method, and sends back the response
  * @param {object} req
  * @param {object} res
  */
  static getMultipleRecords(req, res) {
    ContactsController.all()
    .then(contacts => {
      res.json(contacts);
    })
    .catch(error => {
      Contacts.onError(error, res, 'getMultipleRecords');
    });
  }

  /**
  * @public
  * @static
  * @description Receives all patch (update) requests to the route endpoint,
  * calls the controller's method, and sends back the response
  * @param {object} req
  * @param {object} res
  */
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

  /**
  * @public
  * @static
  * @description Receives all posts requests to the route endpoint,
  * calls the controller's method, and sends back the response
  * @param {object} req
  * @param {object} res
  */
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

  /**
  * @public
  * @static
  * @description Receives all delete requests to the route endpoint,
  * calls the controller's method, and sends back the response
  * @param {object} req
  * @param {object} res
  */
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

  /**
  * @public
  * @static
  * @description Logs into file if an error occurs in some of the route
  * methods
  * @param {string} error
  * @param {object} res
  * @param {string} method
  * @param {string} info
  */
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
