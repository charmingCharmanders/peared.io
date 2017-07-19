exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('prompts', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name');
      table.string('description');
      table.string('category');
      table.string('hint');
      table.string('skeletonCode');
      table.string('solutionCode');
      table.integer('rating').nullable();
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
