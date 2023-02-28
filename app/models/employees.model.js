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

module.exports = Employee;