const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jeet_2022:Ar4HvmddT90M2sDB@cluster0.cqe5zy7.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true});
var conn = mongoose.connection;
conn.once('open', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

// const mongoose = require("../database");
// create an schema
var registeredEventsSchema = new mongoose.Schema({
    email:String,
    event_name: String,
    
        });
var userModel=mongoose.model('users',userSchema);
module.exports= userModel;