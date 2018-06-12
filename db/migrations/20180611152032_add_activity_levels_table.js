
exports.up = function (knex, Promise) {
  return knex.schema.createTable('activity_levels', (table) => {
    table
      .increments();
    table
      .string('name')
      .notNullable()
      .unique();
    table
      .timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('activity_levels');
};
