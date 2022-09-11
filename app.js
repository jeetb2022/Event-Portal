
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




// passport 
const bcrypt = require("bcrypt");
const passport = require("passport");
const methodOverride = require("method-override");

// db support
const users = require('./Models/loginModel');

// configuring and initializing passport
const initializePassport = require("./passport-config");
const { use } = require("passport");
initializePassport.initialize(passport);




app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));






// routes

// index page
var fetchModel = require("./Models/fetch-model");
app.get("/index", checkAuthenticated, (req, res) => {
  fetchModel.fetchModel.find({}, function (err, allDetails) {
    if (err) {
        console.log(err);
    } else {
        res.render("index", { userData: allDetails })
    }
})
});



app.get("/indexForAdmin", checkAuthenticated, (req, res) => {
  fetchModel.fetchModel.find({}, function (err, allDetails) {
    if (err) {
        console.log(err);
    } else {
        res.render("indexForAdmin", { userData: allDetails })
    }
})
});





// login page
app.get("/loginAsUser", checkNotAuthenticated, (req, res) => {
  res.render("loginAsUser");
});
app.get("/loginAsAdmin", checkNotAuthenticated, (req, res) => {
  res.render("loginAsAdmin");
});



app.post(
  "/loginAsUser",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
app.post(
  "/loginAsAdmin",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/indexForAdmin",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// new user register page
app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    var id= "_" + Math.random().toString(36).slice(2);
     var newUser = new users.user();
         newUser.id = id;
         newUser.name = req.body.name;
         newUser.email = req.body.email;
         newUser.password = req.body.password;
 
         //save the user in mongoData base
         newUser.save(function(err) {
             if (err) {
                 res.send(err);
             } else {
                 res.redirect('/loginAsUser');
             }    
         });
  } catch (e) {
    console.log(e);
    res.redirect("/redirect");
  }

});

// logout of the application
app.delete("/logout",checkAuthenticated, (req, res) => {
  req.logOut(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});



// only authenticated user should enter index page
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    // res.redirect("/login");
    res.send("u are not authorized  ");
  }
}

// unauthenticated user should not enter index page
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/index");
  }
  next();
}











// Get home page
app.get('/', function(req, res, next) {
  res.render('login', { title: 'login page' });
});



app.use('/', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(3000,()=>{
  console.log("the server is running on port 3000");
});

