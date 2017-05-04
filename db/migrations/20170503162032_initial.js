
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('folders',
  function(table) {
    table.increments('id').primary();
    table.string('title');

    table.timestamps();
  }),

  knex.schema.createTable('urls',
    function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('full-url');
      table.string('short-url');
      table.datetime('date-created');
      table.integer('visited');
      table.integer('folder_id').unsigned();
      table.foreign('folder_id')
        .references('folders.id');

      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.scheme.dropTable('folders'),
    knex.scheme.dropTable('urls')
  ]);
};
