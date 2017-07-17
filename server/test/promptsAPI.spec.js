'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Prompts API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts GET requests to /api/prompts', function (done) {
    request(app)
      .get('/api/prompts')
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

  it('accepts GET requests to /api/prompts/:id', function (done) {
    request(app)
      .get('/api/prompts/1')
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

  it('sends 404 if id on GET requests to /api/prompts/:id does not exist', function (done) {
    request(app)
      .get('/api/prompts/123')
      .expect(404)
      .end(done);
  });

  it('accepts POST requests to /api/prompts', function (done) {
    const prompt = {
      name: 'Prompt 1',
      description: 'Description for Prompt 1',
      category: 'Recursion',
      hint: 'Hint for Prompt 1',
      skeletonCode: 'Skeleton code for Prompt 1',
      solutionCode: 'Solution code for Prompt 1',
      rating: 10
    };

    request(app)
      .post('/api/prompts')
      .send(prompt)
      .expect(res => {
        res.body = {
          name: res.body.name,
          description: res.body.description,
          category: res.body.category,
          hint: res.body.hint,
          skeletonCode: res.body.skeletonCode,
          solutionCode: res.body.solutionCode,
          rating: res.body.rating
        };
      })
      .expect(201, prompt)
      .end(done);
  });

  it('accepts PUT requests to /api/prompts/:id', function () {
    const prompt = {
      name: 'Prompt A',
      description: 'Description for Prompt A',
      category: 'Recursion',
      hint: 'Hint for Prompt A',
      skeletonCode: 'Skeleton code for Prompt A',
      solutionCode: 'Solution code for Prompt A',
      rating: 10
    };

    return request(app)
      .put('/api/prompts/1')
      .send(prompt)
      .expect(200)
      .then(() => {
        return request(app)
          .get('/api/prompts/1')
          .expect(res => {
            res.body = {
              name: res.body.name,
              description: res.body.description,
              category: res.body.category,
              hint: res.body.hint,
              skeletonCode: res.body.skeletonCode,
              solutionCode: res.body.solutionCode,
              rating: res.body.rating
            };
          })
          .expect(200, prompt);
      });
  });

  it('sends 404 if id on PUT requests to /api/prompts/:id does not exist', function (done) {
    request(app)
      .put('/api/prompts/123')
      .expect(404)
      .end(done);
  });
});
