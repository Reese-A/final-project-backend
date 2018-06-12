
exports.up = function (knex, Promise) {
  return knex.schema.createTable('dishes', (table) => {
    table
      .increments();
    table
      .string('name')
      .notNullable()
      .unique();
    table
      .integer('user_id')
      .notNullable()
    table
      .foreign('user_id')
      .references('id')
      .inTable('users');
    table
      .integer('popularity')
      .notNullable()
      .defaultTo(0);
    table
      .timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('dishes');
};
