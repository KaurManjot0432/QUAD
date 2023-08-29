const mysql = require("mysql2/promise");
const quadDbConfig = require("../config/quadDb.config.js");

const pool = mysql.createPool({
    host: quadDbConfig.HOST,
    user: quadDbConfig.USER,
    password: quadDbConfig.PASSWORD,
    database: quadDbConfig.DB
});


pool.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected to university!");
});

module.exports = pool;