import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const User = mongoose.model('users');

export default function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    // Search user
    User.findOne({
      username
    }).then((user) => {
      if (!user) {
        return done(null, false, { message: 'No User Found' });
      }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { message: 'Password incorrect' });
      });

      return false;
    });
  }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
