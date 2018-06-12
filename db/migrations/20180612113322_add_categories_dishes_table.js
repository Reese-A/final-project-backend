
exports.up = function (knex, Promise) {
  return knex.schema.createTable('categories_dishes', (table) => {
    table
      .increments();
    table
      .integer('category_id')
      .notNullable()
    table
      .foreign('category_id')
      .references('id')
      .inTable('categories');
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
  return knex.schema.dropTable('categories_dishes');
};
