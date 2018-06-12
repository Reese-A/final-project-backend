
exports.up = function (knex, Promise) {
  return knex.schema.createTable('dishes_foods', (table) => {
    table
      .increments();
    table
      .integer('food_id')
      .notNullable();
    table
      .foreign('food_id')
      .references('id')
      .inTable('foods');
    table
      .integer('dish_id')
      .notNullable()
    table
      .foreign('dish_id')
      .references('id')
      .inTable('dishes');
    table
      .timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('dishes_foods');
};
