const db = require('../');

const Prompt = db.Model.extend({
  tableName: 'prompts',
  session: function() {
    return this.hasMany('Session', '');
  },
  tests: function() {
    return this.hasMany('Test', 'promptId');
  }
});

module.exports = db.model('Prompt', Prompt);
