import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema('public')
    .createTable('post_comment', (table) => {
      table.increments();
      table
        .integer('post_id')
        .references('id')
        .inTable('post')
        .notNullable()
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE');
      table.text('content').notNullable();
      table.datetime('comment_date').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.withSchema('public').dropTable('post_comment');
}
