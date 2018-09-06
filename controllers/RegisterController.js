const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../models/User');
const User = mongoose.model('users');

module.exports = {
  index(req, res) {
    return res.render('users/register');
  },
  store(req, res) {
    let errors = [];
    const { username, password, password2 } = req.body;

    if(password !== password2) {
      errors.push({text: 'Passwords do not match'});
    }
    if(password.length < 4) {
      errors.push({text: 'Password must be at least 4 characters'});
    }

    if(errors.length) {
      res.render('users/register', {
        errors,
        username,
        password,
        password2
      });
    } else {
      User.findOne({username})
        .then(user => {
          if(user) {
            req.flash('error_msg', 'Username is already taken');
            res.redirect('/users/register');
          } else {
            const newUser = new User({
              username,
              password
            });
      
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
  
                newUser.save()
                  .then(user => {
                    req.flash('success_msg', 'You are now registered and can log in');
                    res.redirect('/users/login');
                  })
                  .catch(err => {
                    return;
                  });
              });
            });
          }
        })
        .catch(err => {
          return;
        });
    }
  }
};