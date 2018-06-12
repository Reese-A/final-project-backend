
exports.up = function (knex, Promise) {
  return knex.schema.createTable('foods', (table) => {
    table
      .increments();
    table
      .string('name')
      .notNullable();

    table
      .integer('category_id')
      .notNullable()
    table
      .foreign('category_id')
      .references('id')
      .inTable('categories');

    table
      .integer('calories')
      .notNullable();
    table
      .integer('carb')
      .notNullable();
    table
      .integer('fat')
      .notNullable();
    table
      .integer('protein')
      .notNullable();
    table
      .integer('popularity')
      .notNullable()
      .defaultTo(0);
    table
      .timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('foods');
};
