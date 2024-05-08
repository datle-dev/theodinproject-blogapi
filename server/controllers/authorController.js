const Author = require('../models/author');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.allAuthorsGet = asyncHandler(async (req, res, next) => {
  res.json({ message: 'Author All GET' });
});

exports.authorGet = asyncHandler(async (req, res, next) => {
  res.json({ message: 'Author GET', authorId: `${req.params.authorId}` });
});

exports.authorPost = asyncHandler(async (req, res, next) => {
  res.json({ message: 'Author POST' });
});

exports.authorPut = asyncHandler(async (req, res, next) => {
  res.json({ message: 'Author PUT', authorId: `${req.params.authorId}` });
});

exports.authorDelete = asyncHandler(async (req, res, next) => {
  res.json({ message: 'Author DELETE', authorId: `${req.params.authorId}` });
});
