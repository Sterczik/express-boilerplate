const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/* Load User Model
1: Require model file
*/
const User = mongoose.model('users');

module.exports = function(passport) {
  passport.use(new LocalStrategy({usernameField: 'username'}, (username, password, done) => {
    // Match user
    User.findOne({
      username
    }).then(user => {
      if(!user) {
        return done(null, false, { message: 'No User Found' });
      }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

