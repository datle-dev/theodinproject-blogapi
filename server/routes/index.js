const asyncHandler = require('express-async-handler');
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();

require('dotenv').config();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.json({ message: 'Home' });
  }),
);

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  asyncHandler(async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  }),
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, username: user.username };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
