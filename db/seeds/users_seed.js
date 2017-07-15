
const models = require('../models');

exports.seed = function (knex, Promise) {
  return models.User.where({ emailAddress: 'admin@domain.com' }).fetch()
    .then((user) => {
      if (user) {
        throw user;
      }
      return models.User.forge({
        firstName: 'System1',
        lastName: 'Admin1',
        emailAddress: 'admin@domain.com'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create user');
      throw err;
    })
    .then((user) => {
      return models.Auth.forge({
        type: 'local2',
        password: 'admin1234',
        profile_id: user.get('id')
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create auth');
    })
    .catch(() => {
      console.log('WARNING: default user already exists.');
    });
};


