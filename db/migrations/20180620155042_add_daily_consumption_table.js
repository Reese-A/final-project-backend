exports.up = function(knex, Promise) {
  return knex.schema.createTable('daily_consumption', table => {
    table.increments();
    table.integer('user_id').notNullable();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users');
    table.decimal('total_calories', 9, 3).notNullable();
    table.specificType('tracked_calories', 'decimal[]');
    table.specificType('tracked_times', 'bigint[]');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('daily_consumption');
};
