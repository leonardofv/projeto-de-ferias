import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.withSchema('public').createTable('userProfile', (table) => {
        table.increments();
        table.integer('userId').references('id').inTable('users').notNullable().unique().onDelete('CASCADE');
        table.string('name').notNullable();
        table.string('profilePicture');
        table.string('bio');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.withSchema('public').dropTable('userProfile');
}
