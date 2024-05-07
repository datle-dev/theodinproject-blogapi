const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.send('Users');
  }),
);

module.exports = router;
