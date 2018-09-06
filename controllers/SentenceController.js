const mongoose = require('mongoose');

require('../models/Sentence');
const Sentence = mongoose.model('sentences');

module.exports = {
  index(req, res) {
    Sentence.find({})
      .then(sentences => {
        res.render('sentences/index', { sentences });
      });
  },
  create(req, res) {
    return res.render('sentences/add');
  },
  store(req, res) {
    const { content } = req.body;
    let errors = [];

    if(!content) {
      errors.push({text: 'Please add some content'});
    }

    if(errors.length) {
      res.render('sentences/add', {
        errors,
        content
      });
    } else {
      const newUser = {
        content: content,
        user: req.user.id
      };

      new Sentence(newUser)
        .save()
        .then(sentence => {
          req.flash('success_msg', 'Sentence added');
          res.redirect('/sentences');
        });
    }
  }
};