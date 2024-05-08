const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.allPostsGet = asyncHandler(async (req, res, next) => {
  res.json({ message: 'Post All GET' });
});

exports.postGet = asyncHandler(async (req, res, next) => {
  res.json({ message: 'Post GET', postId: `${req.params.postId}` });
});

exports.postPost = asyncHandler(async (req, res, next) => {
  res.json({ message: 'Post POST' });
});

exports.postAllCommentsGet = asyncHandler(async (req, res, next) => {
  res.json({ message: 'Post All Comment GET', postId: `${req.params.postId}` });
});

exports.postCommentGet = asyncHandler(async (req, res, next) => {
  res.json({
    message: 'Post Comment GET',
    postId: `${req.params.postId}`,
    commentId: `${req.params.commentId}`,
  });
});

exports.postCommentPost = asyncHandler(async (req, res, next) => {
  res.json({
    message: 'Post Comment POST',
    postId: `${req.params.postId}`,
  });
});

exports.postPut = asyncHandler(async (req, res, next) => {
  res.json({
    message: 'Post PUT',
    postId: `${req.params.postId}`,
  });
});

exports.postCommentPut = asyncHandler(async (req, res, next) => {
  res.json({
    message: 'Post Comment PUT',
    postId: `${req.params.postId}`,
    commentId: `${req.params.commentId}`,
  });
});

exports.postDelete = asyncHandler(async (req, res, next) => {
  res.json({
    message: 'Post DELETE',
    postId: `${req.params.postId}`,
  });
});

exports.postCommentDelete = asyncHandler(async (req, res, next) => {
  res.json({
    message: 'Post Comment DELETE',
    postId: `${req.params.postId}`,
    commentId: `${req.params.commentId}`,
  });
});
