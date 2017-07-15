const db = require('../');

const Session = db.Model.extend({
  tableName: 'sessions',
  user: function() {
    return this.belongsTo('User');
  },
  prompt: function() {
    return this.belongsTo('Prompt');
  },
});

module.exports = db.model('Session', Session);
