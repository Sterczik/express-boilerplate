require('dotenv').config();

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import methodOverride from 'method-override';
import helmet from 'helmet';
import compress from 'compression';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import mongoose from 'mongoose';
import sassMiddleware from 'node-sass-middleware';

// Load Routes
import indexRouter from './routes/index';
import sentencesRouter from './routes/sentences';
import usersRouter from './routes/users';

const app = express();
app.use(helmet());
app.use(cors({
  credentials: true,
  origin: true
}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compress());

// Passport Config
import passportConfig from './config/passport';
passportConfig(passport);

// DB Config
const dbURI = process.env.NODE_ENV === 'production' ? process.env.DB_URI : process.env.DEV_DB_URI;

// Connect to mongoose
mongoose.connect(dbURI, {
  useNewUrlParser: true
})
  .then(() => {})
  .catch(err => console.log(new Error(err)));

mongoose.set('useCreateIndex', true);

// Handlebars middleware init
import { truncate, formatDate, ifCond } from './helpers/handlebars';

app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    truncate,
    formatDate,
    ifCond
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
  indentedSyntax: false,
  sourceMap: true
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

// Global variables for Flash
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
  console.log(`Server started on port ${port}`);
});
