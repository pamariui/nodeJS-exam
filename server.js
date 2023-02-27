const express = require('express');
require('dotenv').config();


const app = express();

app.use(express.json());


//  Version route
app.get('/version', (req,res) =>{
    res.json({
        version: 'v0.1.0'
    });
});


// Set port
const PORT = process.env.APP_PORT || 8080
// Listen for requests
app.listen(PORT, () => {
    console.log(`Server is listed on port: ${PORT}.`);
})