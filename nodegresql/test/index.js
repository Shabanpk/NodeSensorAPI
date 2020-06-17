'use strict';
var test = require('tape');
var request = require('supertest');
var app = require('../JEST_API_TESTING');

test('Correct users returned', function (t) {
    request(app)
      .get('/getSpecificData')
      //.get('/getSensorById/1')
      
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        var expectedUsers = [{ id: 1, bus_code: 'TGHC', latitude: '-6.20221' }];
  
        t.error(err, 'No error');
        t.same(res.body,expectedUsers,'Users as expected');
        t.end();
      });
  });