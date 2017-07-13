const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  auths: function() {
    return this.hasMany('Auth');
  }
});

module.exports = db.model('User', User);
