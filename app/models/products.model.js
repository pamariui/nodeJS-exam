const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/db.config');

const Product = function(product) {
    this.product_id = product.product_id;
    this.product_name = product.product_name;
    this.supplier_id = product.supplier_id;
    this.category_id = product.category_id;
    this.quantity_per_unit = product.quantity_per_unit;
    this.unit_price = product.unit_price;
}

Product.create = async (newProduct, result) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'INSERT INTO products SET ?';

        con.query(query,newProduct, (err,res) => {
            if(err) {
                console.log("error:", err);
                result(err, null);
                return;
            }
            console.log('Created product!', { id: res.insertId, ...newProduct});
            result(null, { id: res.insertId, ...newProduct})
        });
        
        await con.end();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

Product.getAll = async () => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query =  `SELECT *
                        FROM products`;
        const [results] = await con.execute(query);

        await con.end();
        return results;
        
    } catch (err) {
        console.log(err);
        throw err;
    }
}

Product.getById = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = ` SELECT * 
                        FROM products
                        WHERE product_id = ?`;
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

Product.getById = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = ` SELECT * 
                        FROM products
                        WHERE product_id = ?`;
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

Product.update = async (id,newData) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = ` SELECT * 
                        FROM products
                        WHERE product_id = ?`;
        const updateQuery = `UPDATE products SET
                            product_name = COALESCE(?, product_name),
                            supplier_id = COALESCE(?, supplier_id),
                            category_id = COALESCE(?, category_id),
                            quantity_per_unit = COALESCE(?, quantity_per_unit),
                            unit_price = COALESCE (?, unit_price)
                            WHERE product_id = ?`;
        
        const [results] = await con.execute(query,[id]);

        if(results.length === 0) {
            throw { message: 'not_found' };
        } else {
            const [updateResult] = await con.query(updateQuery, [   newData.product_name,
                                        newData.supplier_id,
                                        newData.category_id,
                                        newData.quantity_per_unit,
                                        newData.unit_price,
                                        id]);
            console.log(updateResult.affectedRows + " record(s) updated");
        }

        await con.end();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

Product.delete = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = `DELETE FROM products WHERE product_id = ?`;

        const [results] = await con.execute(query, [id]);
        
        if (results.affectedRows === 0) {
            throw { message: 'not_found' };
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = Product;