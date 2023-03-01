const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/db.config');

const OrderDetail = function(order) {
    this.order_details_id = order.order_details_id;
    this.order_id = order.order_id;
    this.product_id = order.product_id;
    this.unit_price = order.unit_price;
    this.quantity = order.quantity;
    this.discount = order.discount;
}

OrderDetail.create = async (newOrderDetail, result) => {
   try {
    const con = await mysql.createConnection(mysqlConfig);

        // Chek if order exists
        const [orderRows] = await con.query(
            `SELECT * 
            FROM orders 
            WHERE order_id = ?`,
            [newOrderDetail.order_id]
        );
        if(orderRows.length === 0) {
            throw { message: 'order_not_found' };
        };

         // Chek if product exists
         const [productRows] = await con.query(
            `SELECT * 
            FROM products 
            WHERE product_id = ?`,
            [newOrderDetail.product_id]
        );

        if(productRows.length === 0) {
            throw { message: 'product_not_found' };
        }

        const query = 'INSERT INTO order_details SET ?';
        con.query(query,newOrderDetail, (err,res) => {
            if(err) {
                console.log("error:", err);
                result(err, null);
                return;
            }
            console.log('Created new order', { id: res.insertId, ...newOrderDetail});
            result(null, { id: res.insertId, ...newOrderDetail})
        });
        await con.end();
   } catch (err) {
        console.log(err);
        throw err;
   }
}

OrderDetail.getAll = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = `SELECT * 
                       FROM order_details
                       WHERE order_id = ?`;
        const [results] = await con.execute(query,[id]);

        await con.end();
        return results;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

OrderDetail.getById = async (id,detailId) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = ` SELECT * 
                        FROM order_details
                        WHERE order_id = ? AND order_details_id = ?`;
        const [results] = await con.execute(query,[id,detailId])

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

module.exports = OrderDetail;