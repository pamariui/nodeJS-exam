const Product = require('../models/products.model');

exports.create = async (req,res) => {
    try {
        
        const {

            product_name,
            supplier_id,
            category_id,
            quantity_per_unit,
            unit_price
          } = req.body;

        if(!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        const requiredFields = [
            "product_name",
            "supplier_id",
            "category_id",
            "quantity_per_unit",
            "unit_price"
        ];

         for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send({ message: `${field} is a required field!` });
            }
        }

        const product = new Product({
            product_name,
            supplier_id,
            category_id,
            quantity_per_unit,
            unit_price
        });

        await Product.create(product);

        res.status(201).send({
            message: "Product added!",
            product: product
        });
        
    } catch (err) {

        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
          });
    }
}

exports.getAll = async (req,res) => {
    try {

        const results = await Product.getAll();

        res.status(200).send(results);

    } catch (err) {

        console.error('Error in exports.getAll:', err);
        res.status(500).send({
            message: 'An error occurred while retrieving users',
            error: err.message
        });
    }
}

exports.getById = async (req,res) => {
    try {

        const id = req.params.id;
        const product = await Product.getById(id);

        res.status(200).send(product);

    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found product with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving product with id.'});
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
        await Product.update(id,newData);

        res.status(200).send({
            message: `product updated!`
        });

    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found product with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving product with id.'});
        }
    }
}

exports.delete = async (req,res) => {
    try {

        const id = req.params.id;
        
        await Product.delete(id);

        res.send({
            message: "Product deleted successfully!"
        }).status(204);

    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found product with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving product with id.'});
        }
    }
}