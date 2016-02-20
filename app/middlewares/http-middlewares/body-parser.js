'use strict';
const parser = require('body-parser').json({type: 'application/vnd.api+json'});

class BodyParser {

  static get priority() {
    return 2;
  }

  static onRequest(req, res, next) {
    req.headers['content-type'] = 'application/vnd.api+json';
    return parser(req, res, next);
  }

}

module.exports = BodyParser;
