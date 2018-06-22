
exports.up = function (knex, Promise) {
  return knex.schema.table('user_profiles', (table) => {
    table
      .boolean('default');
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.table('user_profiles', (table) => {
    table
      .dropColumn('default');
  })
};
