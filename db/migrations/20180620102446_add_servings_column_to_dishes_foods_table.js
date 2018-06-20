exports.up = function(knex, Promise) {
  return knex.schema.table('dishes_foods', table => {
    table.decimal('servings', 4, 2).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('dishes_foods', table => {
    table.dropColumn('servings');
  });
};
