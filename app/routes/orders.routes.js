const express = require('express');
const order = require('../controllers/orders.controller');



const ordersRouter = new express.Router();

ordersRouter.post('/api/v1/orders', order.create);
ordersRouter.get('/api/v1/orders', order.getAll);
ordersRouter.get('/api/v1/orders/:id', order.getById);
ordersRouter.patch('/api/v1/orders/:id', order.update);
ordersRouter.delete('/api/v1/orders/:id', order.delete)

module.exports = ordersRouter;