// Update with your config settings.
import {env} from 'node:process';
export const development = {
  client: 'sqlite3',
  connection: {
    filename: './src/database/db.sqlite'
  },
  migrations: {
    directory: './src/database/migrations'
  },
  useNullAsDefault: true
};
export const test = {
  client: 'sqlite3',
  connection: {
    filename: './src/database/test.sqlite'
  },
  migrations: {
    directory: './src/database/migrations'
  },
  useNullAsDefault: true
};
export const production = {
     
    client: 'pg', 
    connection: process.env.DATABASE_URL 
  
};

export const staging = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
