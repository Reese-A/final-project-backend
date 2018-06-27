exports.up = function(knex, Promise) {
  return knex.schema.table('dishes', table => {
    table
      .decimal('calories')
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('dishes', table => {
    table.dropColumn('calories');
  });
};
