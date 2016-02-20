'use strict';
const expect = require('chai').expect;
const request = require('request');
const names = require('country-list')().getNames();

describe('Route "countries"', () => {

  it('Should get list of all countries', done => {

    let url = 'http://localhost:3333/countries';

    request(url, (error, response, body) => {

      body = JSON.parse(body);
      expect(body.data).to.deep.equal(names);
      done();

    });

  });

});
