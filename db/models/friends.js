const db = require('../');

const Friend = db.Model.extend({
  tableName: 'friends',
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
  }
});

module.exports = db.model('Friend', Friend);
