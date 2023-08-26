const mysql = require("mysql");
const quadDbConfig = require("../config/quadDb.config.js");

const connection = mysql.createConnection({
    host: quadDbConfig.HOST,
    user: quadDbConfig.USER,
    password: quadDbConfig.PASSWORD,
    database: quadDbConfig.DB
});

const connect = () => {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database');
    });
}

module.exports = connect;