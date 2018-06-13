
exports.up = function (knex, Promise) {
  return knex.schema.table('goals', (table) => {
    table
      .integer('modifier')
      .notNullable()
      .unique();
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.table('goals', (table) => {
    table
      .dropColumn('modifier');
  })
};
