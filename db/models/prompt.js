const db = require('../');

const Prompt = db.Model.extend({
  tableName: 'prompts'
  // auths: function() {
  //   return this.hasMany('Auth');
  // }
});

module.exports = db.model('Prompt', Prompt);
