const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.json({ message: 'Home' });
  }),
);

module.exports = router;
