
const models = require('../models');

exports.seed = function (knex, Promise) {
  return models.User.where({ emailAddress: 'admin1@domain.com' }).fetch()
    .then((user) => {
      if (user) {
        throw user;
      }
      return models.User.forge({
        firstName: 'System1',
        lastName: 'Admin1',
        emailAddress: 'admin1@domain.com'
        }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create user');
      throw err;
    })
    .then((user) => {
      return models.Auth.forge({
        type: 'local12',
        password: 'admin123',
        profile_id: user.get('id')
      }).save();
    })
    .then(() => {
      return models.User.forge({
        firstName: 'System2',
        lastName: 'Admin2',
        emailAddress: 'admin2@domain.com'
        }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create auth');
    })
    .catch(() => {
      console.log('WARNING: default user already exists.');
    });
};


