
exports.up = function (knex, Promise) {
  return knex.schema.table('user_profiles', (table) => {
    table
      .date('birthday')
      .notNullable()
      .alter();
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.table('user_profiles', (table) => {
    table
      .dateTime('birthday')
      .notNullable()
      .alter();
  })
};
