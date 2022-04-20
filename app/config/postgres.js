const { Pool, Client } = require('pg');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '../../.env')});

var db_config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max_connections: 50,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 2000,
};

const client = new Client(db_config);

const pool = new Pool(db_config);

module.exports= {
    pool: pool,
    client: client
};