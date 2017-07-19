const db = require('../');

const Session = db.Model.extend({
  tableName: 'sessions',
  profile: function() {
    return this.belongsTo('Profile');
  },
  prompt: function() {
    return this.belongsTo('Prompt');
  },
});

module.exports = db.model('Session', Session);
