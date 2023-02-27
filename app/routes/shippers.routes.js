const express = require('express');
const shipper = require('../models/shippers.model');


const shippersRouter = new express.Router();

shippersRouter.post('/api/v1/shippers', shipper.create);
shippersRouter.get('/api/v1/shippers', shipper.getAll);
shippersRouter.get('/api/v1/shippers/:id', shipper.getByID);

module.exports = shippersRouter;