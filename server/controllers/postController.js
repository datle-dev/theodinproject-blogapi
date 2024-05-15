const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.allPostsGet = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().sort({date: -1}).exec();
  res.json({ message: 'Post All GET', posts: allPosts });
});

exports.postGet = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).exec();
  res.json({
    message: 'Post GET',
    postId: `${req.params.postId}`,
    username: post.username,
    title: post.title,
    text: post.text,
    date_formatted: post.date_formatted,
  });
});

exports.postPost = [
  body('title')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Title is required'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      username: req.body.username,
      title: req.body.title,
      text: req.body.text,
      comments: req.body.comments,
      date: req.body.date,
      draft: req.body.draft,
    });

    if (!errors.isEmpty()) {
      res.json({ message: 'Post POST Error' });
      return;
    } else {
      await post.save();
      res.json({ message: 'Post POST Success'} );
    }
  }),
]

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
