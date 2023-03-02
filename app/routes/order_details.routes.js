const express = require('express');
const orderDetail = require('../controllers/order_details.controller');

const orderDetailsRouter = new express.Router();

orderDetailsRouter.post('/api/v1/orders/:id', orderDetail.create);
orderDetailsRouter.get('/api/v1/orders/:id/details', orderDetail.getAll);
orderDetailsRouter.get('/api/v1/orders/:id/details/:detailId', orderDetail.getById);
orderDetailsRouter.patch('/api/v1/orders/:id/details/:detailId', orderDetail.update);
orderDetailsRouter.delete('/api/v1/orders/:id/details/:detailId', orderDetail.delete);

module.exports = orderDetailsRouter;