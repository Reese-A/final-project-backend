exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('activity_levels')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('activity_levels').insert([
        { name: 'lightly active', modifier: 1.35 },
        { name: 'active', modifier: 1.55 },
        { name: 'very active', modifier: 1.75 }
      ]);
    });
};
