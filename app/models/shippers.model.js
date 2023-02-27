const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/db.config');

const Shipper = function(shipper) {
    this.shipper_id = shipper.shipper_id;
    this.company_name = shipper.company_name;
    this.phone = shipper.phone;
}

Shipper.create = async (newShipper) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'INSERT INTO shippers SET ?';

        const [result] = await con.query(query, newShipper);

        await con.end();
        console.log("created shipper: ", { id: result.insertId, ...newShipper });
        return { id: result.insertId, ...newShipper };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

Shipper.getByID = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        let query =`SELECT * FROM shippers WHERE shipper_id = ?`;
        const [rows] = await con.query(query, id);
        console.log(rows.length);
        if(!rows.length) {
            throw { message: 'not_found' };
        }
        await con.end();

        return rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

Shipper.getAll = async () => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        let query = `SELECT *
                     FROM shippers`;
        const [result,schema] = await con.query(query);

        await con.end();
        return result;

    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = Shipper;