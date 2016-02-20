'use strict';
const expect = require('chai').expect;
const Storage = require('../../app/components/storage');
const Memory = require('../../app/adapters/memory');
const Mongo = require('../../app/adapters/mongo');
const request = require('request');
const headers = {
  'Content-Type': 'application/vnd.api+json'
};

function makeContactsRequests(storage, next) {

  describe('Making requests to route using storage: ' + storage, () => {

    it('Should get all records for route "contacts"', done => {

      let url = 'http://localhost:3333/contacts';

      request(url, (error, response, body) => {

        body = JSON.parse(body);
        expect(body).to.has.property('data');
        expect(body.data).to.be.instanceof(Array);
        done();

      });

    });

    it('Should create a record on route "contacts"', done => {

      let url = 'http://localhost:3333/contacts';
      let body = {
        data: {
          attributes: {
            'first-name': 'Ivaylo',
            'last-name': 'Ivanov',
            email: 'ivaylo.ivanov.ipi@gmail.com',
            country: 'Bulgaria'
          },
          type: 'contacts'
        }
      };
      let req = {form: JSON.stringify(body), headers: headers};

      request.post(url, req, (error, response, body) => {

        body = JSON.parse(body);
        expect(body).to.has.property('data');
        expect(body.data).to.be.instanceof(Object);
        expect(body.data).to.has.property('id');
        done();

      });

    });

    it('Should return at least one record for route "contacts"', done => {

      let url = 'http://localhost:3333/contacts';

      request(url, (error, response, body) => {

        body = JSON.parse(body);
        expect(body).to.has.property('data');
        expect(body.data).to.be.instanceof(Array);
        expect(body.data).to.have.length.of.at.least(1);
        expect(body.data[0]).to.has.property('id');
        expect(body.data[0]).to.has.property('attributes');
        done();

      });

    });

    it('Should should get and update record for route "contacts"', done => {

      let url = 'http://localhost:3333/contacts';
      let data = {
        data: {
          attributes: {
            'first-name': 'Ivaylo - updated',
            'last-name': 'Ivanov',
            email: 'ivaylo.ivanov.ipi@gmail.com',
            country: 'Bulgaria'
          },
          type: 'contacts'
        }
      };

      request(url, (error, response, body) => {

        body = JSON.parse(body);
        let id = body.data[0].id;
        data.id = id;
        let req = {form: JSON.stringify(data), headers: headers};

        request.patch(url + '/' + id, req, (error, response, body) => {

          expect(response.statusCode).to.equal(204);
          done();

        });

      });

    });

    it('Should return status "500" beacause of missing data', done => {

      let url = 'http://localhost:3333/contacts/1';

      request.patch(url, {}, (error, response, body) => {

        expect(response.statusCode).to.equal(500);
        done();

      });

    });

    it('Should should get and delete record for route "contacts"', done => {

      let url = 'http://localhost:3333/contacts';

      request(url, (error, response, body) => {

        body = JSON.parse(body);
        let id = body.data[0].id;
        let req = {headers: headers};

        request.del(url + '/' + id, req, (error, response, body) => {

          expect(response.statusCode).to.equal(204);
          done();
          if (typeof next === 'function') {
            next();
          }

        });

      });

    });

  });

}

Storage.changeStorage(Memory);
makeContactsRequests('Memory', () => {
  Mongo.createClient(true);
  Storage.changeStorage(Mongo);
  makeContactsRequests('MongoDB');
});
