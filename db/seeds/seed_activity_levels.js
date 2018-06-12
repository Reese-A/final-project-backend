exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('activity_levels')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('activity_levels').insert([
        { name: 'lightly active' },
        { name: 'active' },
        { name: 'very active' }
      ]);
    });
};
