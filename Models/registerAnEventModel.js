var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jeet_2022:Ar4HvmddT90M2sDB@cluster0.cqe5zy7.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
var conn = mongoose.connection;
conn.on('connected', function () {
    console.log('database is connected successfully');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
var registeredAnEventsSchema = new mongoose.Schema({
    event_id: String,
    event_name: String,
    price: String,
    event_venue : String,
    date_and_time: String,
    email : String
});
registeredAnEventsModel = mongoose.model('registeredEvent', registeredAnEventsSchema);
module.exports = {
    
    fetchModel : registeredAnEventsModel
}