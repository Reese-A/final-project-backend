exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('genders')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('genders').insert([{ name: 'male' }, { name: 'female' }]);
    });
};
