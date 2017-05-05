
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
            { title: 'TEST', 'fullURL': 'www.pinterest.com', 'shortURL': 'tinyurl.com', visited: 0, folder_id: folder[0] }
          ])
        })
      ])
    });
};
