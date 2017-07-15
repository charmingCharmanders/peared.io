const db = require('../');

const Friend = db.Model.extend({
  tableName: 'friends',
  user: function() {
    return this.belongsTo('User');
  }
});

module.exports = db.model('Friend', Friend);
