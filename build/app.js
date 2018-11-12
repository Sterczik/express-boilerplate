'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _nodeSassMiddleware = require('node-sass-middleware');

var _nodeSassMiddleware2 = _interopRequireDefault(_nodeSassMiddleware);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _sentences = require('./routes/sentences');

var _sentences2 = _interopRequireDefault(_sentences);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _passport3 = require('./config/passport');

var _passport4 = _interopRequireDefault(_passport3);

var _handlebars = require('./helpers/handlebars');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();

app.use((0, _helmet2.default)());
app.use((0, _cors2.default)({
  credentials: true,
  origin: true
}));

app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, 'public', 'favicon.ico')));
app.use((0, _compression2.default)());

// Passport Config


(0, _passport4.default)(_passport2.default);

// DB Config
var dbURI = process.env.NODE_ENV === 'production' ? process.env.DB_URI : process.env.DEV_DB_URI;

// Connect to mongoose
_mongoose2.default.connect(dbURI, {
  useNewUrlParser: true
}).then(function () {}).catch(function (err) {
  return console.log(new Error(err));
});

_mongoose2.default.set('useCreateIndex', true);

// Handlebars middleware init


app.set('views', _path2.default.join(__dirname, 'views'));

app.engine('handlebars', (0, _expressHandlebars2.default)({
  defaultLayout: 'main',
  layoutsDir: _path2.default.join(__dirname, 'views/layouts'),
  partialsDir: _path2.default.join(__dirname, 'views/partials'),
  helpers: {
    truncate: _handlebars.truncate,
    formatDate: _handlebars.formatDate,
    ifCond: _handlebars.ifCond
  }
}));
app.set('view engine', 'handlebars');

// BodyParser & CookieParser middleware init
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser2.default)());

// Sass middleware config
app.use((0, _nodeSassMiddleware2.default)({
  src: _path2.default.join(__dirname, 'assets'),
  dest: _path2.default.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: true
}));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

// Method Override middleware init
app.use((0, _methodOverride2.default)('_method'));

// Express Session middleware init
app.use((0, _expressSession2.default)({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
  // cookie: { secure: true }
}));

// Passport middleware init
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

// Flash middleware init
app.use((0, _connectFlash2.default)());

// Global variables for Flash
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Use routes
app.use('/', _index2.default);
app.use('/sentences', _sentences2.default);
app.use('/users', _users2.default);

var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log('Server started on port ' + port);
});