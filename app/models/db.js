const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/db.config');

const con = mysql.createConnection(mysqlConfig);

module.exports = con;