
exports.up = function (knex, Promise) {
  return knex.schema.table('activity_levels', (table) => {
    table
      .decimal('modifier', 3, 2)
      .notNullable()
      .unique();
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.table('activity_levels', (table) => {
    table
      .dropColumn('modifier');
  })
};
