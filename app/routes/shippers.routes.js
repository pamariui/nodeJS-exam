const express = require('express');
const shipper = require('../controllers/shipper.controller');

const shipperRouter = new express.Router();

shipperRouter.post('/api/v1/shippers', shipper.create);
shipperRouter.get('/api/v1/shippers', shipper.getAll);
shipperRouter.get('/api/v1/shippers/:id', shipper.getById);
shipperRouter.patch('/api/v1/shippers/:id', shipper.update);
shipperRouter.delete('/api/v1/shippers/:id', shipper.delete);

module.exports = shipperRouter;