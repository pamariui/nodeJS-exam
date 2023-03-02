const Employee = require('../models/employees.model');

// create empoyee POST '/api/v1/employees'
exports.create = async (req,res) => {
    try {
        
        const {
            employee_id,
            last_name,
            first_name,
            title,
            title_of_courtesy,
            birth_date,
            address,
            city,
          } = req.body;

        if(!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        // chek for not null
        const requiredFields = [
            "last_name", 
            "first_name", 
            "title", 
            "title_of_courtesy", 
            "birth_date", 
            "address", 
            "city"
        ];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send({ message: `${field} is a required field!` });
            }
        }
        
        const employee = new Employee({
            employee_id,
            last_name,
            first_name,
            title,
            title_of_courtesy,
            birth_date,
            hire_date: new Date(),
            address,
            city,
        });

        await Employee.create(employee);

        res.status(201).send({
            message: "Employee added!",
            employee: employee
        });

    } catch (err) {

        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
          });
    }
    
}
// Shows all employees GET'/api/v1/employees'
exports.getAll = async (req,res) => {
    try {

        const results = await Employee.getAll();

        res.status(200).send(results);

    } catch (err) {

        console.error('Error in exports.getAll:', err);
        res.status(500).send({
            message: 'An error occurred while retrieving users',
            error: err.message
        });
    }
}

// Show employee by its id GET '/api/v1/employees/:id'
exports.getById = async (req,res) => {
    try {

        const id = req.params.id;
        const employee = await Employee.getById(id);

        res.status(200).send(employee);
        
    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Employee with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Employee with id.'});
        }
    }
}

// Update employee by its id PATCH '/api/v1/employees/:id'
exports.update = async (req,res) => {
    try {

        const id = req.params.id;
        const newData = req.body;

        if (!newData) {
            return res.status(400).send({ message: "Content can not be empty!" });
        }
        await Employee.update(id,newData);

        res.status(200).send({
            message: `Employee updated!`
        });

    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Employee with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Employee with id.'});
        }
    }
}

// Delete employee by its id PATCH '/api/v1/employees/:id'
exports.delete = async (req,res) => {
    try {

        const id = req.params.id;
        
        await Employee.delete(id);

        res.send({
            message: "Employee deleted successfully!"
        }).status(204);

    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Employee with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Employee with id.'});
        }
    }
}

