const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  auths: function() {
    return this.hasMany('Auth');
  },
  session: function() {
    return this.hasOne('Session');
  }
});

module.exports = db.model('User', User);
