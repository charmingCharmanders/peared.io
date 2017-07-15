const expect = require('chai').expect;
const User = require('../../db/models/user.js');
const dbUtils = require('../../db/lib/utils.js');

describe('User model tests', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able to retrieve test data', function (done) {
    User.forge().fetchAll()
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
    User.where({ id: 1 }).fetch()
      .then(function (result) {
        expect(result.get('id')).to.equal(1);
      })
      .then(function () {
        return User.where({ id: 1 }).save({ firstName: 'James', lastName: 'Davenport' }, { method: 'update' });
      })
      .then(function () {
        return User.where({ id: 1 }).fetch();
      })
      .then(function (result) {
        expect(result.get('firstName')).to.equal('James');
        expect(result.get('lastName')).to.equal('Davenport');
        done();
      })
      .catch(function (err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });

});
