'use strict';
const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const request = require('request');

describe('Route "client-errors"', () => {

  it('Should write client error to file', done => {

    let d = new Date();
    let name = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    let errorMessage = d.toString() + ' Something just when wrong';
    errorMessage = errorMessage.replace('+', '');
    let url = 'http://localhost:3333/client-errors?error=' + errorMessage;

    request.post(url, {}, (error, response, body) => {

      expect(response.statusCode).to.equal(201);

      let file = path.join(__dirname, '../..', 'app', 'logs', name + '.log');

      fs.readFile(file, (err, data) => {

        data = data.toString();
        expect(data).to.include(errorMessage);
        done();

      });

    });

  });

});
