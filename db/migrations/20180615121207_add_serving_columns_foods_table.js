exports.up = function(knex, Promise) {
  return knex.schema.table('foods', table => {
    table.string('serving_size').notNullable();
    table.integer('serving_grams').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('foods', table => {
    table.dropColumn('serving_size');
    table.dropColumn('seving_grams');
  });
};
