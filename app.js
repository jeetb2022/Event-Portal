
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
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: '123456catr',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: oneDay }
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
    failureRedirect: "/loginAsUser",
    failureFlash: true,
  })
);
app.post(
  "/loginAsAdmin",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/indexForAdmin",
    failureRedirect: "/loginAsAdmin",
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
    var id = "_" + Math.random().toString(36).slice(2);
    var newUser = new users.user();
    newUser.id = id;
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    //save the user in mongoData base
    newUser.save(function (err) {
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

app.delete("/logout", (req, res) => {
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










// adding an event
app.get('/addEvent', checkAuthenticated, (req, res, next) => {
  res.render('addEvent');
});
app.post('/addEvent', checkAuthenticated, (req, res, next) => {
 var flag =  fetchModel.fetchModel.findOne({event_id : req.body.eventId},(err,docs)=>{
  flag= docs;
  });
  // if(flag == ""){

    var newEvent = new fetchModel.fetchModel({
      event_id: req.body.eventId,
      event_name: req.body.eventName,
      price: req.body.price,
      event_venue: req.body.eventVenue,
      date_and_time: req.body.eventDateAndTime,
      event_picture: req.body.eventPicture
    });
    newEvent.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/indexForAdmin');
      }
    });
  // }
  // else {
  //   res.redirect('/addevent');
  // }
  
  
});








// Detete an event
app.get('/deleteEvent/:id', (req, res, next) => {
  const event_id = req.params.id;
  res.render('deleteEvent',{event_id : event_id});
});
app.post('/deleteEvent', (req, res, next) => {
  
  fetchModel.fetchModel.findOne({event_id:req.body.eventId}, function (err, docs) {
    docs.deleteOne(); 
    res.redirect('/indexForAdmin');
      });
    });

























// Register For an event 
const registerAnEventModel = require('./Models/registerAnEventModel');
const { redirect } = require('statuses');
app.get('/registerAnEvent/:id', checkAuthenticated, (req, res, next) => {
  const event_id = req.params.id;
  res.render('registerForEvent',{event_id : event_id});
});
app.post('/registerAnEvent', checkAuthenticated, (req, res, next) => {
  var email = req.body.email;
  var eventId = req.body.eventId;

  fetchModel.fetchModel.findOne({ event_id: eventId }, (err, allDetails) => {
    var event_name = allDetails["event_name"];
    var price = allDetails["price"];
    var event_venue = allDetails["event_venue"];
    var date_and_time = allDetails["date_and_time"];


    var newEventRegistered = new registerAnEventModel.fetchModel({
      event_id: eventId,
      event_name: allDetails["event_name"],
      price: allDetails["price"],
      event_venue: allDetails["event_venue"],
      date_and_time: allDetails["date_and_time"],
      email: email
    });
    newEventRegistered.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/index');
      }
    });


  });
});



















// Upcoming events 
app.get('/upcomingEvents', checkAuthenticated, (req, res, next) => {
  registerAnEventModel.fetchModel.find({ email: "jeet.b@ahduni.edu.in" }, function (err, allDetails) {
    if (err) {
      console.log(err);
    } else {
      // res.render("indexForAdmin", { userData: allDetails })
      res.render('upcomingEvents', { upcomingEvents: allDetails });
    }
  });
});


















// Get home page
app.get('/', function (req, res, next) {
  res.render('login', { title: 'login page' });
});







// catch 404 and forward to error handler
app.use(function (req, res, next) {
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












app.listen(3000, () => {
  console.log("the server is running on port 3000");
});

