var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jeet', { useNewUrlParser: true });
var conn = mongoose.connection;
conn.on('connected', function () {
    console.log('database is connected successfully');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
var userSchema = new mongoose.Schema({
    event_id: String,
    event_name: String,
    price: String,
    event_venue : String,
    date_and_time: String,
    event_picture: String
});
userTable = mongoose.model('eventdetail', userSchema);
module.exports = {
    fetchData: function (callback) {
        var userData = userTable.find({});
        userData.exec(function (err, data) {
            if (err) throw err;
            // console.log(data);
            return callback(data);
        })
    },
    fetchModel : userTable,
    connection : conn
}