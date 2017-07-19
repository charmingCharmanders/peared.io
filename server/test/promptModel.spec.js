const expect = require('chai').expect;
const Prompt = require('../../db/models/prompts.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Prompt model tests', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able to retrieve test data', function (done) {
    Prompt.forge().fetchAll()
      .then(function (results) {
        expect(results.length).to.equal(1);
        expect(results.at(0).get('id')).to.equal(1);
        done();
      })
      .catch(function (err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });

  it('Should be able to update an already existing record', function (done) {
    Prompt.where({ id: 1 }).fetch()
      .then(function (result) {
        expect(result.get('id')).to.equal(1);
      })
      .then(function () {
        return Prompt.where({ id: 1 }).save({ name: 'prime numbers', description: 'prime numbers description...' }, { method: 'update' });
      })
      .then(function () {
        return Prompt.where({ id: 1 }).fetch();
      })
      .then(function (result) {
        expect(result.get('name')).to.equal('prime numbers');
        expect(result.get('description')).to.equal('prime numbers description...');
        done();
      })
      .catch(function (err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });

});
