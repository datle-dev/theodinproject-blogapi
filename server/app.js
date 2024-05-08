const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();
require('./auth/auth');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const secureRouter = require('./routes/secure');

const app = express();

// Set up mongoose connection
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log(
    `mongoose connection readyState = ${mongoose.connection.readyState}`,
  );
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use(
  '/secure',
  passport.authenticate('jwttest', { session: false }),
  secureRouter,
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err.stack);
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
