const Employee = require('../models/employees.model');

exports.create = async (req,res) => {
    try {
        if(!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        // chek for not null
        const requiredFields = ["last_name", 
                                "first_name", 
                                "title", 
                                "title_of_courtesy", 
                                "birth_date", 
                                "address", 
                                "city"];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send({ message: `${field} is a required field!` });
            }
        }
        
        const employee = new Employee({
            employee_id: req.body.employee_id,
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            title: req.body.title,
            title_of_courtesy: req.body.title_of_courtesy,
            birth_date: req.body.birth_date,
            hire_date: new Date(),
            address: req.body.address,
            city: req.body.city,
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

            
