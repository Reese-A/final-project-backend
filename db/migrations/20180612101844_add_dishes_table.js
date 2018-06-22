exports.up = function(knex, Promise) {
  return knex.schema.createTable('dishes', table => {
    table.increments();
    table.string('name').notNullable();
    table.integer('user_id').notNullable();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dishes');
};
