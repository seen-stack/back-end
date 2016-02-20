'use strict';
let names = JSON.stringify({data: require('country-list')().getNames()});

class Countries {

  static get url() {
    return '/countries';
  }

  static getMultipleRecords(req, res) {
    res.end(names);
  }

}

module.exports = Countries;
