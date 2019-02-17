const environment = process.env.NODE_ENV || 'development';
import config from '../../knexfile';
const envConfig = config[environment];
import knex from 'knex';
const connect = knex(envConfig);

export default connect;
