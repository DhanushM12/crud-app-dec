const express = require('express');
const app = express();
const port = 8000;

const db = require('./config/mongoose');

app.use(express.json());

const subscriberRouter = require('./routes/index');

app.use('/subscriber', subscriberRouter);

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is up and running on the port: ${port}`)
})