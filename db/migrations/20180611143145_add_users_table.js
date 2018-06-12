
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table
      .increments();
    table
      .string('email')
      .notNullable()
      .unique();
    table
      .string('password')
      .notNullable();
    table
      .string('first_name')
      .notNullable();
    table
      .string('last_name')
      .notNullable();
    table
      .timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
