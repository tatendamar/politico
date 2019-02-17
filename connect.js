// Update with your config settings.
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connect: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected!!');
});

const createTables = () => {
  const queryParties = `CREATE TABLE IF NOT EXISTS

   parties(
     id UUID PRIMARY KEY,
     name VARCHAR(128) NOT NULL,
     email VARCHAR(128) NOT NULL,
     address CHAR(50)   NOT NULL,
     city  VARCHAR(128) NOT NULL,
     created_date TIMESTAMP,
     modified_date TIMESTAMP
)`;

  pool
    .query(queryParties)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

const dropTables = () => {
  const queryParties = 'DROP TABLE IF EXISTS parties';
  pool
    .query(queryParties)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
};

require('make-runnable');

// staging: {
//   client: 'postgresql',
//   connection: {
//     database: 'my_db',
//     user:     'username',
//     password: 'password'
//   },
//   pool: {
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: 'knex_migrations'
//   }
// },

// production: {
//   client: 'postgresql',
//   connection: {
//     database: 'my_db',
//     user:     'username',
//     password: 'password'
//   },
//   pool: {
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: 'knex_migrations'
//   }
// }
