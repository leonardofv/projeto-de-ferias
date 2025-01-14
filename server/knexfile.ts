import type { Knex } from 'knex';
import dotenv from 'dotenv';

// Update with your config settings.

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};

module.exports = config;
