const express = require('express');
const employee = require('../controllers/employees.controller');

const employeesRouter = new express.Router();

employeesRouter.post('/api/v1/employees',employee.create);

module.exports = employeesRouter;
