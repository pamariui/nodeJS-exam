const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/db.config');


const Shipper = function(shipper) {
    this.shipper_id = shipper.shipper_id;
    this.company_name = shipper.company_name;
    this.phone = shipper.phone;
}

Shipper.create = async (newShipper, result) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'INSERT INTO shippers SET ?';

        con.query(query, newShipper, (err,res) => {
            if(err){
                console.log('error:  ', err);
                result(err, null);
                return;
            }

            console.log('Created shipper: ', {
                id:res.insertId, ...newShipper
            });
            result(null, {
                id:res.insertId, ...newShipper
            })
        });
        await con.end();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

Shipper.getByID = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        let query =`SELECT *
                    FROM shippers
                    WHERE shippers_id = ?`;
        const [rows] = await con.query(query, id);
        console.log(rows.length);
        if(!rows.lengt) {
            throw { message: 'not_found' };
        }
        await con.end();

        return rows;
    } catch (err) {
        console.log(err);
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