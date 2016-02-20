'use strict';
const Mongo = require('../adapters/mongo');

class MongoAdapter {

  constructor() {
    Mongo.createClient();
  }

  static get priority() {
    return 2;
  }

}

module.exports = MongoAdapter;
