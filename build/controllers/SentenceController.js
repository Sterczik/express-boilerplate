'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

require('../models/Sentence');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sentence = _mongoose2.default.model('sentences');

exports.default = {
  index: function index(req, res) {
    Sentence.find({}).populate('user').sort({ date: 'desc' }).then(function (sentences) {
      res.render('sentences/index', { sentences: sentences });
    });
  },
  public: function _public(req, res) {
    Sentence.find({
      user: req.params.userId
    }).populate('user').sort({ date: 'desc' }).then(function (sentences) {
      res.render('sentences/index', { sentences: sentences });
    });
  },
  private: function _private(req, res) {
    Sentence.find({
      user: req.user.id
    }).populate('user').sort({ date: 'desc' }).then(function (sentences) {
      res.render('sentences/my', { sentences: sentences });
    });
  },
  create: function create(req, res) {
    return res.render('sentences/add');
  },
  store: function store(req, res) {
    var content = req.body.content;


    var schema = {
      content: _joi2.default.string().min(1).required()
    };
    var validation = _joi2.default.validate(req.body, schema);

    if (validation.error) {
      res.render('sentences/add', {
        error: validation.error.details[0].message,
        content: content
      });
    } else {
      var newSentence = {
        content: content,
        user: req.user.id
      };

      new Sentence(newSentence).save().then(function (sentence) {
        req.flash('success_msg', 'Sentence added');
        res.redirect('/sentences');
      });
    }
  },
  edit: function edit(req, res) {
    Sentence.findOne({
      _id: req.params.id
    }).then(function (sentence) {
      if (sentence.user.toString() !== req.user.id.toString()) {
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/sentences');
        return false;
      }
      return res.render('sentences/edit', { sentence: sentence });
    });
  },
  update: function update(req, res) {
    var content = req.body.content;


    var schema = {
      content: _joi2.default.string().min(1).required(),
      _method: _joi2.default.string().required()
    };
    var validation = _joi2.default.validate(req.body, schema);

    if (validation.error) {
      res.render('sentences/edit', {
        error: validation.error.details[0].message,
        content: content
      });
    } else {
      Sentence.findOne({
        _id: req.params.id
      }).then(function (sentence) {
        sentence.content = content;

        sentence.save().then(function () {
          req.flash('success_msg', 'Sentence edited');
          res.redirect('/sentences');
        });
      });
    }
  },
  destroy: function destroy(req, res) {
    Sentence.findByIdAndRemove(req.params.id).then(function () {
      req.flash('success_msg', 'Sentence deleted');
      res.redirect('/sentences');
    });
  }
};