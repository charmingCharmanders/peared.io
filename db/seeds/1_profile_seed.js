const models = require('../models');
let profiles = require('../data/profiles');

if (process.env.NODE_ENV === 'test') {
  profiles = require('../data/test/profiles');
}

exports.seed = function (knex, Promise) {
  profiles.forEach(iteratedProfile => {
    return models.Profile
      .where({
        emailAddress: iteratedProfile.emailAddress
      })

      .fetch()

      .then(profile => {
        if (profile) {
          throw profile;
        }
        return models.Profile
          .forge({
            firstName: iteratedProfile.firstName,
            lastName: iteratedProfile.lastName,
            emailAddress: iteratedProfile.emailAddress
          })
          .save();
      })

      .error(() => {
        console.error('ERROR: failed to create user');
      })

      .then(profile => {
        return models.Auth
          .forge({
            type: 'local',
            password: 'password',
            profileId: profile.get('id')
          })
          .save();
      })

      .error(() => {
        console.error('ERROR: failed to create auth');
      })

      .catch(profile => {
        console.error(`WARNING: ${profile.get('emailAddress')} already exists`);
      });
  });
};
