const Comment = require('../models/comment');
const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.allPostsGet = asyncHandler(async (req, res, next) => {
  let allPosts;

  if (Object.hasOwn(req.query, 'username')) {
    allPosts = await Post.find({ username: req.query.username }).sort({date: -1}).exec()
  } else {
    allPosts = await Post.find().sort({date: -1}).exec();
  }

  res.json(allPosts);
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
    draft: post.draft,
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
  const allComments = await Comment.find({ postId: req.params.postId }).exec();

  res.json({
    message: 'Post All Comment GET',
    postId: `${req.params.postId}`,
    comments: allComments,
  });
});

exports.postCommentGet = asyncHandler(async (req, res, next) => {
  res.json({
    message: 'Post Comment GET',
    postId: `${req.params.postId}`,
    commentId: `${req.params.commentId}`,
  });
});

exports.postCommentPost = [
  body('text')
    .isLength({ min: 5 })
    .escape()
    .withMessage('Comment must be at least 5 characters'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const comment = new Comment({
      username: req.body.username,
      text: req.body.text,
      date: req.body.date,
      postId: req.params.postId,
    });

    if (!errors.isEmpty()) {
      res.json({ message: 'Post POST Error' });
      return;
    } else {
      await comment.save();
      res.json({
        message: 'Post Comment POST',
        postId: `${req.params.postId}`,
      });
    }
  }),
];

exports.postPut = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  let post = await Post.findById(req.params.postId).exec();

  let postToUpdate;

  if (req.body.purpose === 'edit') {
    postToUpdate = new Post({
      username: post.username,
      title: req.body.title,
      text: req.body.text,
      comments: post.comments,
      date: post.date,
      draft: req.body.draft,
      _id: post._id,
    });
  } else if (req.body.purpose === 'toggleDraft') {
    postToUpdate = new Post({
      username: post.username,
      title: post.title,
      text: post.text,
      comments: post.comments,
      date: post.date,
      draft: req.body.draft,
      _id: post._id,
    });
  }

  if (!errors.isEmpty()) {
    res.json({ message: 'Post PUT Error'});
    return;
  } else {
    await Post.findByIdAndUpdate(req.params.postId, postToUpdate, {});
    res.json({
      message: 'Post PUT',
      postId: `${req.params.postId}`,
      updatedPost: postToUpdate,
    });
  }
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
