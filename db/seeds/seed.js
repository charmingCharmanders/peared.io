const models = require('../models');
let auths = require('../data/auths');
let friends = require('../data/friends');
let profiles = require('../data/profiles');
let prompts = require('../data/prompts');
let sessions = require('../data/sessions');
let tests = require('../data/tests');

if (process.env.NODE_ENV === 'test') {
  auths = require('../data/test/auths');
  friends = require('../data/test/friends');
  profiles = require('../data/test/profiles');
  prompts = require('../data/test/prompts');
  sessions = require('../data/test/sessions');
  tests = require('../data/test/tests');
}

exports.seed = function(knex, Promise) {
  return knex('profiles').insert(profiles)
    .then(() => {
      return knex('auths').insert(auths);
    })
    .then(() => {
      return knex('friends').insert(friends);
    })
    .then(() => {
      return knex('prompts').insert(prompts);
    })
    .then(() => {
      return knex('sessions').insert(sessions);
    })
    .then(() => {
      return knex('tests').insert(tests);
    });
};
