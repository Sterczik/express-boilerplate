import Joi from 'joi';
import mongoose from 'mongoose';

require('../models/Sentence');

const Sentence = mongoose.model('sentences');

export default {
  index(req, res) {
    Sentence.find({})
      .populate('user')
      .sort({ date: 'desc' })
      .then((sentences) => {
        res.render('sentences/index', { sentences });
      });
  },
  public(req, res) {
    Sentence.find({
      user: req.params.userId
    })
      .populate('user')
      .sort({ date: 'desc' })
      .then((sentences) => {
        res.render('sentences/index', { sentences });
      });
  },
  private(req, res) {
    Sentence.find({
      user: req.user.id
    })
      .populate('user')
      .sort({ date: 'desc' })
      .then((sentences) => {
        res.render('sentences/my', { sentences });
      });
  },
  create(req, res) {
    return res.render('sentences/add');
  },
  store(req, res) {
    const { content } = req.body;

    const schema = {
      content: Joi.string().min(1).required()
    };
    const validation = Joi.validate(req.body, schema);

    if (validation.error) {
      res.render('sentences/add', {
        error: validation.error.details[0].message,
        content
      });
    } else {
      const newSentence = {
        content,
        user: req.user.id
      };

      new Sentence(newSentence)
        .save()
        .then((sentence) => {
          req.flash('success_msg', 'Sentence added');
          res.redirect('/sentences');
        });
    }
  },
  edit(req, res) {
    Sentence.findOne({
      _id: req.params.id
    })
      .then((sentence) => {
        if (sentence.user != req.user.id) {
          req.flash('error_msg', 'Not Authorized');
          res.redirect('/sentences');
          return false;
        }
        return res.render('sentences/edit', { sentence });
      });
  },
  update(req, res) {
    const { content } = req.body;

    const schema = {
      content: Joi.string().min(1).required(),
      _method: Joi.string().required()
    };
    const validation = Joi.validate(req.body, schema);

    if (validation.error) {
      res.render('sentences/edit', {
        error: validation.error.details[0].message,
        content
      });
    } else {
      Sentence.findOne({
        _id: req.params.id
      })
        .then((sentence) => {
          sentence.content = content;

          sentence.save()
            .then(() => {
              req.flash('success_msg', 'Sentence edited');
              res.redirect('/sentences');
            });
        });
    }
  },
  destroy(req, res) {
    Sentence.findByIdAndRemove(req.params.id)
      .then(() => {
        req.flash('success_msg', 'Sentence deleted');
        res.redirect('/sentences');
      });
  }
};
