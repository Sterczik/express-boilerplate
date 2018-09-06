require('../models/User');

module.exports = {
  index(req, res, next) {
    return res.render('index/index', { title: 'Title!' });
  }
};