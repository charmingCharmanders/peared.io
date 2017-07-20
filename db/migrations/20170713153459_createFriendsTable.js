exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('friends', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('profileId').unsigned();
      table.foreign('profileId').references('id').inTable('profiles');
      table.integer('friendId').unsigned();
      table.foreign('friendId').references('id').inTable('profiles');
      table.unique(['profileId', 'friendId']);
      table.string('status');
      table.integer('updatedBy').unsigned();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('friends')
  ]);
};
