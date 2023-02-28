const express = require('express');
const shipper = require('../controllers/shippers.controller');

const shippersRouter = new express.Router();

shippersRouter.post('/api/v1/shippers', shipper.create);
shippersRouter.get('/api/v1/shippers', shipper.getAll);
shippersRouter.get('/api/v1/shippers/:id', shipper.getById);
shippersRouter.patch('/api/v1/shippers/:id', shipper.update);
shippersRouter.delete('/api/v1/shippers/:id', shipper.delete);

module.exports = shippersRouter;