const express = require('express');
const employeesRouter = require('./app/routes/employees.routes');
const shippersRouter = require('./app/routes/shippers.routes');
require('dotenv').config();

const app = express();

app.use(express.json());

// version route
app.get('/version', (req,res) => {
    res.json({
        version: 'v0.1.0'
    });
});

app.use(shippersRouter);
app.use(employeesRouter);

// PORT set
const PORT = process.env.SERVER_PORT || 8080;

// Listen for request
app.listen(PORT, () => {
    console.log(`Server is listed on port: ${PORT}.`);
});