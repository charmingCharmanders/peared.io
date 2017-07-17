const db = require('../');

const Friend = db.Model.extend({
  tableName: 'friends',
  profile: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Friend', Friend);
