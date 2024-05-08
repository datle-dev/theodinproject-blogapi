const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.allUsersGet = asyncHandler(async (req, res, next) => {
  res.json({ message: 'User All GET' });
});

exports.userGet = asyncHandler(async (req, res, next) => {
  res.json({ message: 'User GET', userId: `${req.params.userId}` });
});

exports.userPost = asyncHandler(async (req, res, next) => {
  res.json({ message: 'User POST' });
});

exports.userPut = asyncHandler(async (req, res, next) => {
  res.json({ message: 'User PUT', userId: `${req.params.userId}` });
});

exports.userDelete = asyncHandler(async (req, res, next) => {
  res.json({ message: 'User DELETE', userId: `${req.params.userId}` });
});
