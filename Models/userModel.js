const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jeet', {useNewUrlParser: true});
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
var userSchema = new mongoose.Schema({
            name: String,
            email:String
        });
var userModel=mongoose.model('users',userSchema);
module.exports= userModel;