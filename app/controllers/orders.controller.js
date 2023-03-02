const Order = require('../models/orders.model');

exports.create = async  (req,res) => {
    const {
        customer_id,
        employee_id,
        shipper_id
        } = req.body;
    try {
      
        const requiredFields = [
           'customer_id',
           'employee_id',
           'shipper_id'
        ];
      
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send({ 
                    message: `${field} is a required field!` 
                });
            }
        }
      
        const order = new Order({
            customer_id,
            employee_id,
            shipper_id,
            order_date: new Date()
        });
      
        await Order.create(order);

        res.status(201).send({
            message: 'Order added!',
            order: order
        });
    } catch (err) {
        // if (err.message === 'customer_not_found') {
        //     return res.status(404).send({
        //         message: `Customer with id: ${customer_id}  not found!`,
        //     });
        // } 
        if (err.message === 'employee_not_found') {
            return res.status(404).send({
                message: `Employee with id: ${employee_id} not found!`,
            });
        } if (err.message === 'shipper_not_found') {
            return res.status(404).send({
                message: `Shipper with id: ${shipper_id} not found!`,
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
        const results = await Order.getAll();

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
        const order = await Order.getById(id);

        const response = {
            unitPrice: order[0].unitPrice,
            quantity: order[0].quantity,
            discount: order[0].discount,
            employee: {
              id: order[0].employee_id,
              last_name: order[0].last_name,
              first_name: order[0].first_name,
              title: order[0].title,
              title_of_courtesy: order[0].title_of_courtesy,
              birth_date: order[0].birth_date,
              hire_date: order[0].hire_date,
              address: order[0].address,
              city: order[0].city,
            },
            products: order.map((item) => ({
              id: item.id,
              lastName: item.lastName,
            })),
          };
          
        res.status(200).send(response);
        
    } catch (err) {
        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found order with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving order with id.'});
        }
    }
}

exports.update = async (req,res) => {
        const id = req.params.id;
        const newData = req.body;
    try {
        
        if (!newData) {
            return res.status(400).send({ message: "Content can not be empty!" });
        }
        await Order.update(id,newData);

        res.status(200).send({
            message: "Order Updated"
        })
        
    } catch (err) {
        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found order with id.'});
        } if (err.message === 'customer_not_found') {
            return res.status(404).send({
                message: `Customer with id: ${newData.customer_id}  not found!`,
            });
        } if (err.message === 'employee_not_found') {
            return res.status(404).send({
                message: `Employee with id: ${newData.employee_id} not found!`,
            });
        } if (err.message === 'shipper_not_found') {
            return res.status(404).send({
                message: `Shipper with id: ${newData.shipper_id} not found!`,
            });
        } else {
            res.status(500).send({ message: 'Error retrieving order with id.'});
        }
    }
}


exports.delete = async (req,res) => {
    try {
        const id = req.params.id;
        
        await Order.delete(id);

        res.send({
            message: "Order deleted successfully!"
        }).status(204);

    } catch (err) {
        if (err.message === 'not_found') {
            res.status(404).send({ message: 'Not found order with id.'});
        } else {
            res.status(500).send({ message: 'Error retrieving product with id.'});
        }
    }
}