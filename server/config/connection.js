var mysql = require('mysql');
const util = require('util');

// Config your Database
const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'auth_client'
}

// Create Database Connection Pool
console.log(config)
var pool = mysql.createPool(config);

// Create the query binding
var query = util.promisify(pool.query).bind(pool);

// Check the Database Connection
pool.getConnection(function (err) {
    if (err) {
        console.error("Could not connect to the database");
        console.error(err);
    }
    else {
        console.error("Successfully connected to the database");
    }
});

/**
 *
 * @param {*} excute Body function which needs to be executed
 * @param {*} commit Whether transaction needs to be committed or not
 * @returns {Promise<boolean>}
 */
async function executeTransaction(excute, commit) {
    return new Promise((resolve, reject) => {
        if (pool) {
            pool.getConnection(async function (err, connection) {
                if (err) {
                    reject(Error("Could not connected to the database"));
                }
                else {
                    let beginTransaction = util.promisify(connection.beginTransaction).bind(connection);
                    let rollback = util.promisify(connection.rollback).bind(connection);
                    let query = util.promisify(connection.query).bind(connection);
                    try {
                        await beginTransaction();
                        await excute({ query: query });
                        if (commit) {
                            let commit = util.promisify(connection.commit).bind(connection);
                            await commit();
                        }
                        else {
                            await rollback();
                        }
                        resolve(true);
                    } catch (error) {
                        await rollback();
                        reject(error);
                    }
                }
            });
        }
        else {
            reject(Error("Connection pool is not configured"));
        }
    });
}

module.exports = {
    query,
    executeTransaction
}
