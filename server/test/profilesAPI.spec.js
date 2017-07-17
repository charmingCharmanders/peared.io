'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Profiles API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts GET requests to /api/profiles', function (done) {
    request(app)
      .get('/api/profiles')
      .expect(res => {
        res.body = {
          length: res.body.length
        };
      })
      .expect(200, {
        length: 2
      })
      .end(done);
  });

  it('accepts GET requests to /api/profiles/:id', function (done) {
    request(app)
      .get('/api/profiles/1')
      .expect(res => {
        res.body = {
          id: res.body.id,
          createdAt: !!Date.parse(res.body.createdAt)
        };
      })
      .expect(200, {
        id: 1,
        createdAt: true
      })
      .end(done);
  });

  it('sends 404 if id on GET requests to /api/profiles/:id does not exist', function (done) {
    request(app)
      .get('/api/profiles/123')
      .expect(404)
      .end(done);
  });

  it('accepts PUT requests to /api/profiles/:id', function () {
    let profile = {
      emailAddress: 'example@email.com',
      firstName: 'James',
      lastName: 'Davenport'
    };

    return request(app)
      .put('/api/profiles/1')
      .send(profile)
      .expect(200)
      .then(() => {
        return request(app)
          .get('/api/profiles/1')
          .expect(res => {
            res.body = {
              emailAddress: res.body.emailAddress,
              firstName: res.body.firstName,
              lastName: res.body.lastName
            };
          })
          .expect(200, profile);
      });
  });

  it('sends 404 if id on PUT requests to /api/profiles/:id does not exist', function (done) {
    request(app)
      .put('/api/profiles/123')
      .expect(404)
      .end(done);
  });
});
