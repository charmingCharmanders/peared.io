exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('prompts', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name').unique();
      table.string('description', 1000);
      table.string('category');
      table.string('hint');
      table.string('skeletonCode');
      table.string('solutionCode', 1000);
      table.integer('userId').unsigned();
      table.foreign('userId').references('id').inTable('profiles');
      table.integer('difficulty');
      table.string('createdBy');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('prompts')
  ]);
};
