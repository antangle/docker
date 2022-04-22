const { pool } = require('../config/postgres');
const { errorCatchMapper } = require('../utils/errorHandler');

const msg = {
    QUERY_FAIL_ERROR: "query failed!"
}

const createTable = async (req, res, next) => {
    const dbname = "users";
    const queryString = `CREATE TABLE ${dbname} (
        id serial PRIMARY KEY,
        name VARCHAR ( 50 ) NOT NULL,
        email VARCHAR ( 255 ) NOT NULL
    );`;
    await pool.query(`DROP TABLE IF EXISTS ${dbname};`)
    await pool.query(queryString);
    await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', ["antangle", "zanaris@naver.com"]);
    await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', ["origincurly", "heisfreeatlast@yeah.com"]);
    res.send("done");
}

const getUser = async (req, res, next) => {
    const ret = await pool.query(
        'SELECT * FROM users'
    );
    if(!ret) throw Error(msg.QUERY_FAIL_ERROR);
    res.send(ret.rows);
}

// /test/user/:id
const getUserById = async (req, res, next) => {
    const id = parseInt(req.params.id);    
    const ret = await pool.query(
        'SELECT * FROM users WHERE id = $1', 
        [id]
    );
    if(!ret) throw Error(msg.QUERY_FAIL_ERROR);
    res.send(ret.rows);
}
    
const createUser = async (req, res, next) => {
    const { name, email } = req.body;
    const ret = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2)', 
        [name, email]
    );
    if(!ret) throw Error(msg.QUERY_FAIL_ERROR);
    res.send(ret.rows);
}

const updateUser = async (req, res, next) => {
    const { name, email, id } = req.body;
    const ret = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
    );
    if(!ret) throw Error(msg.QUERY_FAIL_ERROR);
    res.send(ret.rows);
}

const deleteUser = async (req, res, next) => {
    const {id} = req.body;
    const ret = await pool.query(
        'DELETE FROM users WHERE id = $1', 
        [id]
    );
    if(!ret) throw Error(msg.QUERY_FAIL_ERROR);
    res.send(ret.rows);
}

const apis = {
    createTable,
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}

errorCatchMapper(apis);

module.exports = apis