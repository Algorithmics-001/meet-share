const { Pool } = require('pg');
require('dotenv').config();
async function getDatabasePool() {
    const pool = new Pool({
        user: process.env.POSTGRESQL_USERNAME,
        host: process.env.POSTGRESQL_HOST,
        database: process.env.POSTGRESQL_DATABASE,
        password: process.env.POSTGRESQL_PASSWORD,
        port: process.env.POSTGRESQL_PORT,
    });

    return pool;
}

module.exports = {
    getDatabasePool
};
