const models = require('../models');

exports.seed = function (knex, Promise) {
  return models.Session.where({ promptId: 1 }).fetch()
    .then((session) => {
      if (session) {
        throw session;
      }
      return models.Session.forge({
        profileId1: 1,
        profileId2: 2,
        promptId: 1,
        skeletonCode: 'skeleton code goes here...',
        solutionCode: 'solution code goes here...'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create session');
      throw err;
    })
    .catch(() => {
      console.log('WARNING: default session already exists.');
    });
};
