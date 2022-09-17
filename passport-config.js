// adding passport related configuration
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require('./Models/loginModel');

let useId,userName;
function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    var user;

    User.user.findOne({ email: email }, function (err, docs) {

      if (err) {
        console.log(err);
      }
      else {
        user = docs;
        if (user == null) {
          return done(null, false, { message: "User not found" });
        }

        try {
          // console.log(docs["password"]);
          // console.log(password);
          if ((password === docs["password"])) {
            useId = docs["id"];
            userName = docs["name"];
            // console.log(userName);
            return done(null, user);
          } else {
            return done(null, false, { message: "Invalid credentials" });
          }
        } catch (e) {
          return done(e);
        }
      }
    });
  }
  
  
  
  
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        email : user.email,
        name : user.name
      });
    });
  });
  passport.deserializeUser((id, done) => {
    return done(null, id);
  });
}

module.exports.initialize =initialize;
module.exports.name =userName;
