exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('parties', table => {
      table.increments();
      table.text('name').notNullable();
      table.string('email').notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('logo').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('officies', table => {
      table.increments();
      table.text('name').notNullable();
      table.string('type').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('parties').dropTable('officies');
};
