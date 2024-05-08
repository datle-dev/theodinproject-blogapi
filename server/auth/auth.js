const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

require('dotenv').config();

const userFields = {
  usernameField: 'username',
  passwordField: 'password',
};

const opts = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const signupCallback = async (username, password, done) => {
  try {
    const user = await User.create({ username, password });
    return done(null, user);
  } catch (err) {
    done(err);
  }
};

const loginCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const isValid = await user.isValidPassword(password);

    if (isValid) {
      return done(null, user, { message: 'Logged in successfully' });
    } else {
      return done(null, false, { message: 'Wrong password' });
    }
  } catch (err) {
    return done(err);
  }
};

const tokenCallback = async (token, done) => {
  try {
    return done(null, token.user);
  } catch (err) {
    console.log(err);
    done(err);
  }
};

const signupStrategy = new LocalStrategy(userFields, signupCallback);
const loginStrategy = new LocalStrategy(userFields, loginCallback);
const tokenStrategy = new JWTStrategy(opts, tokenCallback);

passport.use('signup', signupStrategy);
passport.use('login', loginStrategy);
passport.use('jwttest', tokenStrategy);
