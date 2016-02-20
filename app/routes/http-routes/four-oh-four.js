'use strict';

class FourOhFour {

  static get url() {
    return '/fourOhFour';
  }

  static all(req, res) {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, PUST, OPTIONS, PATCH');
      res.statusCode = 204;
      return res.end();
    }
    res.statusCode = 404;
    return res.end();
  }

}

module.exports = FourOhFour;
