'use strict';
const expect = require('chai').expect;
const request = require('request');

describe('Route "four-oh-four', () => {

  it('Should return status "404" for /uknown-route', done => {

    let url = 'http://localhost:3333/uknown-route';

    request(url, (error, response, body) => {

      expect(response.statusCode).to.equal(404);
      done();

    });

  });

  it('Should return status "204" for "OPTIONS" request', done => {

    let options = {
      method: 'OPTIONS',
      uri: 'http://localhost:3333/uknown-route'
    };

    request(options, (error, response, body) => {

      expect(response.statusCode).to.equal(204);
      done();

    });

  });

});
