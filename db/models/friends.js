const db = require('../');

const Friend = db.Model.extend({
  tableName: 'friends',
  friend: function() {
    return this.belongsTo('Profile', 'friendId');
  },
  profile: function() {
    return this.belongsTo('Profile', 'profileId');
  }
});

module.exports = db.model('Friend', Friend);
