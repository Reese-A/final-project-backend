
exports.up = function (knex, Promise) {
  return knex.schema.table('user_profiles', (table) => {
    table
      .integer('allowance')
      .notNullable();
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.table('user_profiles', (table) => {
    table.dropColumn('allowance');
  })
};
