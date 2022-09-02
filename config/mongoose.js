const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/subscriberdec');

const db = mongoose.connection;

db.on('error', function(){
    console.log("Error in connection to MongoDB")
})

db.once('open', function(){
    console.log('Successfully connected to Mongo DB');
})

module.exports = db;