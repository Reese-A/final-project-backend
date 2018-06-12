
exports.up = function (knex, Promise) {
  return knex.schema.createTable('user_profiles', (table) => {
    table
      .integer('user_id')
      .notNullable()
      .unique();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users');

    table
      .integer('activity_level_id')
      .notNullable()
      .unique();
    table
      .foreign('activity_level_id')
      .references('id')
      .inTable('activity_levels');

    table
      .integer('goal_id')
      .notNullable()
      .unique();
    table
      .foreign('goal_id')
      .references('id')
      .inTable('goals');

    table
      .integer('gender_id')
      .notNullable()
      .unique();
    table
      .foreign('gender_id')
      .references('id')
      .inTable('genders');

    table
      .integer('weight')
      .notNullable();
    table
      .integer('height')
      .notNullable();
    table
      .dateTime('birthday')
      .notNullable();
    table
      .timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user_profiles');
};
