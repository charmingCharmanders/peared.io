exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('friends', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('profileId1').unsigned();
      table.foreign('profileId1').references('id').inTable('profiles');
      table.integer('profileId2').unsigned();
      table.foreign('profileId2').references('id').inTable('profiles');
      table.unique(['profileId1', 'profileId2']);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('friends')
  ]);
};
