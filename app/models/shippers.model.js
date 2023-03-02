const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/db.config');

const Shipper = function(shipper) {
    this.shipper_id = shipper.shipper_id;
    this.company_name = shipper.company_name;
    this.phone = shipper.phone;
}

Shipper.create = async (newShipper,result) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = `INSERT INTO shippers SET ?`;

        con.query(query,newShipper, (err,res) => {
            if(err) {
                console.log("error:", err);
                result(err, null);
                return;
            }

            console.log('Created shipper', { id: res.insertId, ...newShipper});
            result(null, { id: res.insertId, ...newShipper})
        });
    
        await con.end();

    } catch (err) {

        console.log(err);
        throw err;
    }
}

Shipper.getAll = async () => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        let query = `SELECT * FROM shippers`;
        const [results] = await con.execute(query);

        await con.end();
        return results;

    } catch (err) {

        console.log(err);
        throw err;
    }
}

Shipper.getById = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = `SELECT *
                        FROM shippers 
                        WHERE shipper_id = ?`;
        const [results] = await con.execute(query,[id]);
    
        if (!results.length) {
            throw { message: 'not_found' };
        }

        await con.end();
        return results;

    } catch (err) {

        console.log(err);
        throw err;
    }
}

Shipper.update = async (id, newData) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'SELECT * FROM shippers WHERE shipper_id = ?';

        const updateQuery =`UPDATE shippers SET 
                                company_name = COALESCE(?, company_name),
                                phone = COALESCE(?, phone)
                            WHERE shipper_id = ?`;

        const [results] = await con.execute(query,[id]);
        
        if(results.length === 0) {
            throw { message: 'not_found' };
        } else {
            con.execute(updateQuery, [
                newData.company_name,
                newData.phone,
                id], (err,data) => {
                    if(err) throw err;
                });
        }

        await con.end();

    } catch (err) {

        console.log(err);
        throw err;
    }
}

Shipper.delete = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'DELETE FROM shippers WHERE shipper_id = ?';

        const [results] = await con.execute(query, [id]);
        
        if (results.affectedRows === 0) {
            throw { message: 'not_found' };
        }
    } catch (err) {
        
        console.log(err);
        throw err;
    }
}

module.exports = Shipper;