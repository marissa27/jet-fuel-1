
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('urls', function(table) {
        table.dropTimestamps();
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('urls', function(table) {
      table.timestapms()
    })
  ]);
};
