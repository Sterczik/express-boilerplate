require('../models/User');

module.exports = {
  index(req, res, next) {
    res.render('index', { title: 'Title!' });
  }
};