const Shipper = require("../models/shippers.model");

exports.create = async (req,res) => {
    try {
        if(!req.body) {
            res.status(400).send({
                message: 'Content ccan not be empty!'
            });
            return;
        }
        console.log(req.body);
        const shipper = new Shipper({
            shipper_id: req.body.shipper_id,
            company_name: req.body.company_name,
            phone: req.body.phone 
        });

        const shippers = await Shipper.create(shipper);

        res.status(201).send({
            message: 'Shipper added to list.',
            shippers
        });

    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Shipper."
            });
    }
}

exports.getByID  = async (req,res) => {
    try {
        const id = req.params.id
        const shipper = await Shipper.getByID(id);

        res.status(200).send(shipper);

    } catch (err) {
        if (err.message === 'not_found') {
            res.status(404).send({ 
                message: `Not found User with id.` 
            });
        } else {
            res.status(500).send({
                message: 'Error retrieving User with id.'
            });
        }
    }
}

exports.getAll = async (req,res) => {
    try {
        const shippers = await Shipper.getAll();

        res.status(200).send(shippers);
    } catch (err) {
        console.log(err);
        throw err;
    }
}