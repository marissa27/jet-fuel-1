
exports.seed = function(knex, Promise) {
  return knex('urls').del()
    .then(() => knex('folders').del())

    .then(() => {
      return Promise.all([
        knex('folders').insert({
          title: 'Crafts'
        }, 'id')
        .then(folder => {
          return knex('urls').insert([
            { title: 'Pinterest', 'full-url': 'www.pinterest.com', 'short-url': 'tinyurl.com', visited: 0, folder_id: folder[0] }
          ])
        })
      ])
    });
};
