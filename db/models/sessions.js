const db = require('../');

const Session = db.Model.extend({
  tableName: 'sessions',
<<<<<<< HEAD
<<<<<<< HEAD
  profile: function() {
    return this.belongsTo('Profile');
=======
  user: function() {
    return this.belongsTo('User');
>>>>>>> Added tests and friends table, seed files, and specs
=======
  profile: function() {
    return this.belongsTo('Profile');
>>>>>>> multiple commits to change environment variables and small changes for delpoying to heroku.
  },
  prompt: function() {
    return this.belongsTo('Prompt');
  },
});

module.exports = db.model('Session', Session);
