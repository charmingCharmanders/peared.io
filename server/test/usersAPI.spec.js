'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Users API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts GET requests to /api/users', function (done) {
    request(app)
      .get('/api/users')
      .expect(res => {
        res.body = {
          length: res.body.length
        };
      })
      .expect(200, {
        length: 1
      })
      .end(done);
  });

  it('accepts GET requests to /api/users/:id', function (done) {
    request(app)
      .get('/api/users/1')
      .expect(res => {
        res.body = {
          id: res.body.id,
          created_at: !!Date.parse(res.body.created_at)
        };
      })
      .expect(200, {
        id: 1,
        created_at: true
      })
      .end(done);
  });

  it('sends 404 if id on GET requests to /api/users/:id does not exist', function (done) {
    request(app)
      .get('/api/users/123')
      .expect(404)
      .end(done);
  });

  it('accepts PUT requests to /api/users/:id', function () {
    let user = {
      firstName: 'James',
      lastName: 'Davenport',
      emailAddress: 'example@email.com'
    };

    return request(app)
      .put('/api/users/1')
      .send(user)
      .expect(201)
      .then(() => {
        return request(app)
          .get('/api/users/1')
          .expect(res => {
            res.body = {
              firstName: res.body.firstName,
              lastName: res.body.lastName,
              emailAddress: res.body.emailAddress
            };
          })
          .expect(200, user);
      });
  });

  it('sends 404 if id on PUT requests to /api/users/:id does not exist', function (done) {
    request(app)
      .put('/api/users/123')
      .expect(404)
      .end(done);
  });

});
