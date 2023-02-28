const express = require('express');
const employee = require('../controllers/employees.controller');

const employeesRouter = new express.Router();

employeesRouter.post('/api/v1/employees',employee.create);
employeesRouter.get('/api/v1/employees',employee.getAll);
employeesRouter.get('/api/v1/employees/:id',employee.getById);
employeesRouter.patch('/api/v1/employees/:id', employee.update);
employeesRouter.delete('/api/v1/employees/:id', employee.delete);

module.exports = employeesRouter;