exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('goals')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('goals').insert([
        { name: 'lose' },
        { name: 'maintain' },
        { name: 'gain' }
      ]);
    });
};
