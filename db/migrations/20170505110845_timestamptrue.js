
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('urls', function(table) {
        table.timestamps(true, true);
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('urls', function(table) {
      table.dropTimestamps()
    })
  ]);
};
