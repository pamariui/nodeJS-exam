const Shipper = require('../models/shippers.model');

exports.create = async (req,res) => {
    try {

        if(!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        // chek for not null
        const { company_name, phone } = req.body;

        if (!company_name || !phone) {
            res.status(400).send({
                message: "Company name and phone are required fields!"
            });
            return;
        }

        const shipper = new Shipper({
            shipper_id: req.body.id,
            company_name: company_name,
            phone: phone
        });

        await Shipper.create(shipper);

        res.status(201).send({
            message: "Shipper created!",
            shipper:shipper
        });

    } catch (err) {

        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
          });
    }
}

exports.getAll = async (req,res) => {
    try {

        const id = req.params.id;
        const results = await Shipper.getAll(id);

        res.status(200).send(results);
        
    } catch (err) {

        console.error('Error in exports.getAll:', err);
        res.status(500).send({
            message: 'An error occurred while retrieving Shipper',
            error: err.message
        });
    }
}

exports.getById = async (req,res) => {
    try {

        const id = req.params.id;
        const shipper = await Shipper.getById(id);

        res.status(200).send(shipper);

    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Shipper with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Shipper with id '});
        }
    }
}

exports.update = async (req,res) => {
    try {

        const id = req.params.id;
        const newData = req.body;

        if (!newData) {
            return res.status(400).send({ message: "Content can not be empty!" });
        }
        await Shipper.update(id,newData);

        res.status(200).send({
            message: `Shipper updated!`
        });

    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Shipper with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Shipper with id '});
            console.log(err);
        }
    }
}

exports.delete = async (req,res) => {
    try {

        const id = req.params.id;
        
        await Shipper.delete(id);

        res.send({
            message: "Shipper deleted successfully!"
        }).status(204);

    } catch (err) {
        
        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found Shipper with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving Shipper with id '});
            console.log(err);
        }
    }
}
