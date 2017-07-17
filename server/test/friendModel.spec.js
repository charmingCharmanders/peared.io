const expect = require('chai').expect;
const Friend = require('../../db/models/friends.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Friend model tests', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able to retrieve test data', function (done) {
    Friend.forge().fetchAll()
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
    Friend.where({ id: 1 }).fetch()
      .then(function (result) {
        expect(result.get('id')).to.equal(1);
      })
      .then(function () {
        return Friend.where({ id: 1 }).save({
<<<<<<< HEAD
<<<<<<< HEAD
          status: 'approved' }, { method: 'update' });
=======
=======
>>>>>>> multiple commits to change environment variables and small changes for delpoying to heroku.
<<<<<<< HEAD
          profileId1: 1, profileId2: 2 }, { method: 'update' });
=======
          userId1: 1, userId2: 1 }, { method: 'update' });
>>>>>>> Added tests and friends table, seed files, and specs
<<<<<<< HEAD
>>>>>>> Added tests and friends table, seed files, and specs
=======
=======
          profileId1: 1, profileId2: 2 }, { method: 'update' });
>>>>>>> multiple commits to change environment variables and small changes for delpoying to heroku.
>>>>>>> multiple commits to change environment variables and small changes for delpoying to heroku.
      })
      .then(function () {
        return Friend.where({ id: 1 }).fetch();
      })
      .then(function (result) {
<<<<<<< HEAD
<<<<<<< HEAD
        expect(result.get('status')).to.equal('approved');
=======
=======
>>>>>>> multiple commits to change environment variables and small changes for delpoying to heroku.
<<<<<<< HEAD
        expect(result.get('profileId1')).to.equal(1);
        expect(result.get('profileId2')).to.equal(2);
=======
        expect(result.get('userId1')).to.equal(1);
        expect(result.get('userId2')).to.equal(1);
>>>>>>> Added tests and friends table, seed files, and specs
<<<<<<< HEAD
>>>>>>> Added tests and friends table, seed files, and specs
=======
=======
        expect(result.get('profileId1')).to.equal(1);
        expect(result.get('profileId2')).to.equal(2);
>>>>>>> multiple commits to change environment variables and small changes for delpoying to heroku.
>>>>>>> multiple commits to change environment variables and small changes for delpoying to heroku.
        done();
      })
      .catch(function (err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });

});

