import Joi from 'joi';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import '../models/User';

const User = mongoose.model('users');

export default {
  index(req, res) {
    return res.render('users/register');
  },
  store(req, res) {
    const { username, password, password2 } = req.body;

    const schema = {
      username: Joi.string().min(4).max(20).required(),
      password: Joi.string().min(6).max(20).required(),
      password2: Joi.string().required().valid(Joi.ref('password')).options({
        language: {
          any: {
            allowOnly: '!!Passwords do not match'
          }
        }
      })
    };
    const validation = Joi.validate(req.body, schema);

    if (validation.error) {
      res.render('users/register', {
        error: validation.error.details[0].message,
        username,
        password,
        password2
      });
    } else {
      User.findOne({ username })
        .then((user) => {
          if (user) {
            req.flash('error_msg', 'Username is already taken');
            res.redirect('/users/register');
          } else {
            const newUser = new User({
              username,
              password
            });

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (error, hash) => {
                if (error) throw error;
                newUser.password = hash;

                newUser.save()
                  .then(() => {
                    req.flash('success_msg', 'You are now registered and can log in');
                    res.redirect('/users/login');
                  })
                  .catch((e) => {});
              });
            });
          }
        })
        .catch((err) => {});
    }
  }
};
