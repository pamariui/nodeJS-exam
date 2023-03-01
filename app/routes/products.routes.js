const express = require('express');
const product = require('..//controllers/products.controller');

const productsRouter = new express.Router();

productsRouter.post('/api/v1/products', product.create);
productsRouter.get('/api/v1/products',product.getAll);
productsRouter.get('/api/v1/products/:id',product.getById);
productsRouter.patch('/api/v1/products/:id', product.update);
productsRouter.delete('/api/v1/products/:id', product.delete);

module.exports = productsRouter;