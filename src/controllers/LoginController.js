import passport from 'passport';

export default {
  index(req, res) {
    return res.render('users/login');
  },
  store(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/sentences',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  },
  logout(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
  }
};
