const OrderDetail = require('../models/orders_details.model');

exports.create = async (req,res) => {

    const {
        product_id,
        unit_price,
        quantity,
        discount
    } = req.body

    try {

        const requiredFields = [
            "product_id",
            "unit_price",
            "quantity",
            "discount"
        ];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send({ 
                    message: `${field} is a required field!` 
                });
            }
        }

        const orderDetail = new OrderDetail({
            order_id: req.params.id,
            product_id,
            unit_price,
            quantity,
            discount
        });

        await OrderDetail.create(orderDetail);

        res.status(201).send({
            message: 'Order detail created!',
            orderDetail: orderDetail
        });

    } catch (err) {

        if (err.message === 'Order_not_found') {
            return res.status(404).send({
                message: `Order with id: ${order_id} not found!`,
            });
        } if (err.message === 'Product_not_found') {
            return res.status(404).send({
                message: `Product with id: ${product_id} not found!`,
            });
        } else {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Order.',
            });
        }
    }
}

exports.getAll = async (req,res) => {
    try {

        const id = req.params.id;
        const results = await OrderDetail.getAll(id);

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
        const detailId = req.params.detailId
        const orderDetail= await OrderDetail.getById(id,detailId);

        res.status(200).send(orderDetail);

    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found order details with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving order with id.'});
        }
    }
}

exports.update = async (req,res) => {

        const id = req.params.id;
        const detailId = req.params.detailId;
        const newData = req.body;

    try {
        
        if (!newData) {
            return res.status(400).send({ message: "Content can not be empty!" });
        }
        await OrderDetail.update(id,detailId,newData);

        res.status(200).send({
            message: "Order Updated"
        })

    } catch (err) {

        if (err.message === 'Order_not_found') {
            return res.status(404).send({
                message: `Order with id: ${newData.order_id} not found!`,
            });
        } if (err.message === 'Product_not_found') {
            return res.status(404).send({
                message: `Product with id: ${newData.product_id} not found!`,
            });
        } if(err.message === 'not_found') {
            return res.status(404).send({
                message: `Order dont have those details!`,
            });
        } else {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Order.',
            });
        }
    }
}

exports.delete = async (req,res) => {
    try {
        const id = req.params.detailId;
        
        await OrderDetail.delete(id);

        res.send({
            message: "Order deleted successfully!"
        }).status(204);
        
    } catch (err) {

        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found order detail with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving product with id.'});
        }
    }
}

