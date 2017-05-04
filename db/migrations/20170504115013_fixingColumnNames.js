
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('urls', function(table) {
        table.renameColumn('full-url', 'fullURL');
        table.renameColumn('short-url', 'shortURL');
        table.dropColumn('date-created');
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('urls', function(table) {
      table.renameColumn('fullURL', 'full-url');
      table.renameColumn('shortURL', 'short-url');
      table.datetime('date-created');
    })
  ]);
};
