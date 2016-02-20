'use strict';

class Headers {

  static get priority() {
    return 1;
  }

  static onRequest(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
  }

}

module.exports = Headers;
