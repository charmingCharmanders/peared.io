const db = require('../');

const Friend = db.Model.extend({
  tableName: 'friends',
<<<<<<< HEAD
  profile: function() {
    return this.belongsTo('Profile');
=======
  user: function() {
    return this.belongsTo('User');
>>>>>>> Added tests and friends table, seed files, and specs
  }
});

module.exports = db.model('Friend', Friend);
