import knex from 'knex';

import validate from '../utils/validateConfig.js';

const config = validate(process.env);

const connection = knex(config);

export default connection;