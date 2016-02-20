'use strict';
const Storage = require('../components/storage');

class SetStorage {

  constructor() {
    Storage.setStorage();
  }

  static get priority() {
    return 3;
  }

}

module.exports = SetStorage;
