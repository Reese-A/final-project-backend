
exports.up = function (knex, Promise) {
  return knex.schema.table('user_profiles', (table) => {
    table
      .boolean('google_fit');
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.table('user_profiles', (table) => {
    table
      .dropColumn('google_fit');
  })
};
