
exports.up = function (knex, Promise) {
  return knex.schema.createTable('dishes_users', (table) => {
    table
      .increments();
    table
      .integer('user_id')
      .notNullable()
    table
      .foreign('user_id')
      .references('id')
      .inTable('users');
    table
      .integer('dish_id')
      .notNullable();
    table
      .foreign('dish_id')
      .references('id')
      .inTable('dishes');
    table
      .timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('dishes_users');
};
