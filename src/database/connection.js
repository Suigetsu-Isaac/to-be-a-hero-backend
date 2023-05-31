import knex from 'knex';

import validate from '../utils/validateConfig.js';

const config = validate(process.env);
console.log(config)
const connection = knex(config);
console.log(connection.table().debug(true))
export default connection;