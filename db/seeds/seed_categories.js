exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert([
        { name: 'dairy' },
        { name: 'protein' },
        { name: 'fruit' },
        { name: 'vegetable' },
        { name: 'grain' },
        { name: 'fat' },
        { name: 'legume' },
        { name: 'combination' },
        { name: 'not applicable' }
      ]);
    });
};
