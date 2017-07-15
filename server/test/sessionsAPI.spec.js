'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Sessions API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts GET requests to /api/sessions', function (done) {
    request(app)
      .get('/api/sessions')
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

  it('accepts GET requests to /api/sessions/:id', function (done) {
    request(app)
      .get('/api/sessions/1')
      .expect(res => {
        res.body = {
          id: res.body.id,
          startedAt: !!Date.parse(res.body.startedAt)
        };
      })
      .expect(200, {
        id: 1,
        startedAt: true
      })
      .end(done);
  });

  it('sends 404 if id on GET requests to /api/sessions/:id does not exist', function (done) {
    request(app)
      .get('/api/sessions/123')
      .expect(404)
      .end(done);
  });

  it('accepts POST requests to /api/sessions', function (done) {
    const session = {
      userId1: 1,
      userId2: 2,
      promptId: 1,
      solutionCode: 'Solution code goes here'
    };

    request(app)
      .post('/api/sessions')
      .send(session)
      .expect(res => {
        res.body = {
          userId1: res.body.userId1,
          userId2: res.body.userId2,
          promptId: res.body.promptId,
          solutionCode: res.body.solutionCode
        };
      })
      .expect(201, session)
      .end(done);
  });
});
