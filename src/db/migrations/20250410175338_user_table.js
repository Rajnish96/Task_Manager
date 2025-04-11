
exports.up = async function (knex) {
    await knex.schema.createTable('users', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
        table.string('userId').notNullable().unique();
        table.string('fullName');
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps(true, true);
    });
  
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('users');
};
