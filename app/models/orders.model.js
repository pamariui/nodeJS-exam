const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/db.config');

const Order = function(order) {
    this.order_id = order.order_id;
    this.customer_id = order.customer_id;
    this.employee_id = order.employee_id;
    this.shipper_id = order.shipper_id;
    this.order_date = order.order_date;
}

Order.create = async (newOrder, result) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);

        // Chek if employee exists
        const [employeeRows] = await con.query(
            `SELECT * 
            FROM employees 
            WHERE employee_id = ?`,
            [newOrder.employee_id]
        );
        if(employeeRows.length === 0) {
            throw { message: 'employee_not_found' };
        };

         // Chek if shipper exists
         const [shipperRows] = await con.query(
            `SELECT * 
            FROM shippers 
            WHERE shipper_id = ?`,
            [newOrder.shipper_id]
        );

        if(shipperRows.length === 0) {
            throw { message: 'shipper_not_found' };
        }

        const query = 'INSERT INTO orders SET ?';
        con.query(query,newOrder, (err,res) => {
            if(err) {
                console.log("error:", err);
                result(err, null);
                return;
            }
            console.log('Created new order', { id: res.insertId, ...newOrder});
            result(null, { id: res.insertId, ...newOrder})
        });
        await con.end();
        
    } catch (err) {

        console.log(err);
        throw err;
    }
}

Order.getAll = async () => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = `SELECT * 
                       FROM orders`;
        const [results] = await con.execute(query);

        await con.end();
        return results;

    } catch (err) {

        console.log(err);
        throw err;
    }
}

Order.getById = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = `SELECT 
                            order_details.unit_price AS unitPrice, 
                            order_details.quantity, 
                            order_details.discount, 
                            employees.*, 
                            products.product_id AS id, 
                            products.product_name AS lastName
                        FROM 
                            order_details 
                            JOIN orders ON order_details.order_id = orders.order_id
                            JOIN employees ON orders.employee_id = employees.employee_id
                            JOIN products ON order_details.product_id = products.product_id
                        WHERE 
                            orders.order_id = ?`;
        const [results] = await con.execute(query,[id])

        if(!results.length) {
            throw { message: 'not_found' };
        }

        await con.end();
        return results;

    } catch (err) {

        console.log(err);
        throw err;
    }
}

Order.update = async (id,newData) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);

        // Chek if employee exists
        const [employeeRows] = await con.query(
            `SELECT * 
            FROM employees 
            WHERE employee_id = ?`,
            [newData.employee_id]
        );
        if(employeeRows.length === 0) {
            throw { message: 'employee_not_found' };
        };

         // Chek if shipper exists
         const [shipperRows] = await con.query(
            `SELECT * 
            FROM shippers 
            WHERE shipper_id = ?`,
            [newData.shipper_id]
        );

        if(shipperRows.length === 0) {
            throw { message: 'shipper_not_found' };
        }

        const query = ` SELECT * 
                        FROM orders
                        WHERE order_id = ?`;
                        
        const updateQuery = `UPDATE orders SET
                                customer_id = COALESCE(?, customer_id),
                                employee_id = COALESCE(?, employee_id),
                                shipper_id = COALESCE(?, shipper_id)
                            WHERE order_id = ?`;
            
        const [results] = await con.execute(query,[id]);

        if(results.length === 0) {
            throw { message: 'not_found' };
        } else {
            await con.query(updateQuery, [
                newData.customer_id ,
                newData.employee_id,
                newData.shipper_id,
                id
            ]);
        }

        await con.end();

    } catch (err) {

        console.log(err);
        throw err;
    }
}

Order.delete = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = `DELETE FROM orders WHERE order_id = ?`;

        const [results] = await con.execute(query, [id]);
        
        if (results.affectedRows === 0) {
            throw { message: 'not_found' };
        }

    } catch (err) {

        console.log(err);
        throw err;
    }
}

module.exports = Order;