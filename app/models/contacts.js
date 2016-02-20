'use strict';
const Model = require('../components/model');

class Contacts extends Model {

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

  get properties() {
    return ['last-name', 'first-name', 'email', 'country'];
  }

  get entity() {
    return 'contacts';
  }

}

module.exports = Contacts;
