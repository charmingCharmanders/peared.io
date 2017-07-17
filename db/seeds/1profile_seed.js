const models = require('../models');

exports.seed = function (knex, Promise) {
  return models.Profile.where({ emailAddress: 'admin@domain.com' }).fetch()
    .then((profile) => {
      if (profile) {
        throw profile;
      }
      return models.Profile.forge({
        emailAddress: 'admin@domain.com',
        firstName: 'System',
        lastName: 'Admin'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create profile');
      throw err;
    })
    .then((profile) => {
      return models.Auth.forge({
        type: 'local',
        password: 'admin123',
        profileId: profile.get('id')
      }).save();
    })
    .then(() => {
      return models.Profile.forge({
        emailAddress: 'admin@example.com',
        firstName: 'System',
        lastName: 'Admin'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create auth');
    })
    .catch(() => {
      console.log('WARNING: default profile already exists.');
    });
};
