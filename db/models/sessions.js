const db = require('../');

const Session = db.Model.extend({
  tableName: 'sessions',
<<<<<<< HEAD
  profile: function() {
    return this.belongsTo('Profile');
=======
  user: function() {
    return this.belongsTo('User');
>>>>>>> Added tests and friends table, seed files, and specs
  },
  prompt: function() {
    return this.belongsTo('Prompt');
  },
});

module.exports = db.model('Session', Session);
