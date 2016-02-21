/**
 * @author Ivaylo Ivanov
 * @public
 * @class Contacts
 * @extends Model
 * @description Representation of the contacts model, allowing to abstractly
 * manipulate the model without dealing with the storage
 * @requires Model
 */
'use strict';
const Model = require('../components/model');

class Contacts extends Model {

  /**
  * @public
  * @description Getter method for the model schema
  * @returns {object} schema
  */
  get schema() {
    return {
      type: 'object',
      properties: {
        'last-name': {type: 'string'},
        'first-name': {type: 'string'},
        email: {type: 'string'},
        country: {type: 'string'}
      },
      required: this.properties
    };
  }

  /**
  * @public
  * @description Getter method for the model required properties - a record
  * will not be created if these four does not exist or are empty
  * @returns {array} required properties
  */
  get properties() {
    return ['last-name', 'first-name', 'email', 'country'];
  }

  /**
  * @public
  * @description Getter method for the current model name
  * @returns {string} entity
  */
  get entity() {
    return 'contacts';
  }

}

module.exports = Contacts;
