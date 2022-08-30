
<<<<<<< HEAD
const app =express();
const port = 80;

app.use("/static",express.static("static"));

app.use(express.urlencoded());

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/static/index.html');
})
app.get("/form",(req,res)=>{
    res.sendFile(__dirname+'/static/form.html');
})

app.post("/",(req,res)=>{
    let Name = req.body;
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.roll);
})

app.listen(port,()=>{
    console.log("The server is listening");
})
=======
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var usersRouter = require('./routes/users');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(flash());
app.use('/', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
>>>>>>> 574bca13bcb71c9a5bcbbc507d11d2b5f72fe526
