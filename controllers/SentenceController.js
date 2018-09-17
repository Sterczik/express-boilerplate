const mongoose = require('mongoose');

require('../models/Sentence');
const Sentence = mongoose.model('sentences');

module.exports = {
  index(req, res) {
    Sentence.find({})
      .populate('user')
      .sort({date: 'desc'})
      .then(sentences => {
        res.render('sentences/index', { sentences });
      });
  },
  public(req, res) {
    Sentence.find({
      user: req.params.userId
    })
      .populate('user')
      .sort({date: 'desc'})
      .then(sentences => {
        res.render('sentences/index', { sentences });
      });
  },
  private(req, res) {
    Sentence.find({
      user: req.user.id
    })
      .populate('user')
      .sort({date: 'desc'})
      .then(sentences => {
        res.render('sentences/my', { sentences });
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

      const newSentence = {
        content: content,
        user: req.user.id
      };

      new Sentence(newSentence)
        .save()
        .then(sentence => {
          req.flash('success_msg', 'Sentence added');
          res.redirect('/sentences');
        });
    }
  },
  edit(req, res) {
    Sentence.findOne({
      _id: req.params.id
    })
      .then(sentence => {
        if(sentence.user != req.user.id) {
          req.flash('error_msg', 'Not Authorized');
          res.redirect('/sentences');
        } else {
          return res.render('sentences/edit', { sentence });
        }
      });
  },
  update(req, res) {
    Sentence.findOne({
      _id: req.params.id
    })
      .then(sentence => {
        sentence.content = req.body.content;
        
        sentence.save()
          .then(sentence => {
            req.flash('success_msg', 'Sentence edited');
            res.redirect('/sentences');
          });
      });
  },
  destroy(req, res) {
    Sentence.findByIdAndRemove(req.params.id)
      .then(() => {
        req.flash('success_msg', 'Sentence deleted');
        res.redirect('/sentences');
      });
  }
};