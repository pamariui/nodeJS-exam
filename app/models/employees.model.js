const mysql = require('mysql2/promise');
const mysqlConfig = require('../config/db.config');

const Employee = function(employee) {
    this.employee_id = employee.employee_id;
    this.last_name = employee.last_name;
    this.first_name = employee.first_name;
    this.title = employee.title;
    this.title_of_courtesy = employee.title_of_courtesy;
    this.birth_date = employee.birth_date;
    this.hire_date = employee.hire_date;
    this.address = employee.address;
    this.city = employee.city;
}

Employee.create = async (newEmployee, result) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'INSERT INTO employees SET ?';

        con.query(query,newEmployee, (err,res) => {
            if(err) {
                console.log("error:", err);
                result(err, null);
                return;
            }
            console.log('Created shipper', { id: res.insertId, ...newEmployee});
            result(null, { id: res.insertId, ...newEmployee})
        });
        
        await con.end();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

Employee.getAll = async () => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        let query = 'SELECT * FROM employees'
        const [results] = await con.execute(query);

        await con.end();
        return results;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

Employee.getById = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = ` SELECT * 
                        FROM employees
                        WHERE employee_id = ?`;
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

Employee.update = async (id,newData) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = ` SELECT * 
                        FROM employees
                        WHERE employee_id = ?`;
        const updateQuery = `UPDATE employees SET
                            last_name = COALESCE(?, last_name),
                            first_name = COALESCE(?, first_name),
                            title = COALESCE(?, title),
                            title_of_courtesy = COALESCE(?, title_of_courtesy),
                            address = COALESCE (?, address),
                            city = COALESCE(?, city)
                            WHERE employee_id = ?`;
        
        const [results] = await con.execute(query,[id]);

        if(results.length === 0) {
            throw { message: 'not_found' };
        } else {
            const [updateResult] = await con.query(updateQuery, [  newData.last_name,
                                        newData.first_name,
                                        newData.title,
                                        newData.title_of_courtesy,
                                        newData.address,
                                        newData.city,
                                        id]);
            console.log(updateResult.affectedRows + " record(s) updated");
        }

        await con.end();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

Employee.delete = async (id) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const query = 'DELETE FROM employees WHERE employee_id = ?';

        const [results] = await con.execute(query, [id]);
        
        if (results.affectedRows === 0) {
            throw { message: 'not_found' };
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = Employee;