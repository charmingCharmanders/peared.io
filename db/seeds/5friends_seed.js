const models = require('../models');

exports.seed = function (knex, Promise) {
  return models.Friend.where({ profileId1: 1}).fetch()
    .then((friends) => {
      if (friends) {
        throw friends;
      }
      return models.Friend.forge({
        profileId1: 1,
        profileId2: 2
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create friend');
      throw err;
    })
    .catch(err => {
      console.log(err);
      console.log('WARNING: default friend already exists.');
    });
};
