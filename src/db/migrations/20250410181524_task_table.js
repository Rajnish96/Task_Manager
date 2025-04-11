exports.up = async function (knex) {
    await knex.schema.createTable('tasks', function (table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description');
        table.boolean('reminderSent').defaultTo(false);
        table.enu('status', ['pending', 'in-progress', 'completed']).defaultTo('pending');
        table.date('dueDate').notNullable();
        table.string('userId').notNullable();
        table.foreign('userId').references('userId').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('tasks');
};
