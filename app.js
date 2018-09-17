require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const helmet = require('helmet');
const compress = require('compression');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');

const app = express();
app.use(helmet());
app.use(cors({
  credentials: true,
  origin: true
}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compress());

// Load Routes
const indexRouter = require('./routes/index');
const sentencesRouter = require('./routes/sentences');
const usersRouter = require('./routes/users');

const {
  truncate,
  formatDate,
  ifCond
} = require('./helpers/handlebars');

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/database');

// Connect to mongoose
mongoose.connect(db.dbURI, {
  useNewUrlParser: true
})
  .then(() => {})
  .catch(err => new Error(err));

// Handlebars middleware init
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    truncate: truncate,
    formatDate: formatDate,
    ifCond: ifCond
  }
}));
app.set('view engine', 'handlebars');

// BodyParser & CookieParser middleware init
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(cookieParser());

// Sass middleware config
app.use(sassMiddleware({
  src: path.join(__dirname, 'assets'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

// Method Override middleware init
app.use(methodOverride('_method'));

// Express Session middleware init
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
  // cookie: { secure: true }
}));

// Passport middleware init
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware init
app.use(flash());

//Global variables for Flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Use routes
app.use('/', indexRouter);
app.use('/sentences', sentencesRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // console.log(`Server started on port ${port}`);
});