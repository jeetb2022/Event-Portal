const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jeet', { useNewUrlParser: true,
useUnifiedTopology: true});
var conn = mongoose.connection;
conn.once('open', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

// create an schema
var userSchema = new mongoose.Schema({
            id : String,
            name: String,
            email:String,
            password : String
        });
var userModel=mongoose.model('userid',userSchema);
module.exports= userModel;