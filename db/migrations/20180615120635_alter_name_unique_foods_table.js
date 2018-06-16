exports.up = function(knex, Promise) {
  return knex.schema.table('foods', table => {
    table
      .string('name')
      .notNullable()
      .unique()
      .alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('foods', table => {
    table
      .string('name')
      .notNullable()
      .alter();
  });
};
