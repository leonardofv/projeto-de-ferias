import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.withSchema('public').createTable('post', (table) => {
        table.increments();
        table.integer('user_id').references('id').inTable('users').primary().onDelete('CASCADE');
        table.string('path').notNullable();
        table.date('publish_date').notNullable();
        table.string('description');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.withSchema('public').dropTable('post');
}

