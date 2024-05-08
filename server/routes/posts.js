const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.allPostsGet);
router.get('/:postId', postController.postGet);
router.get('/:postId/comments', postController.postAllCommentsGet);
router.get('/:postId/comments/:commentId', postController.postCommentGet);

router.post('/', postController.postPost);
router.post('/:postId/comments', postController.postCommentPost);

router.put('/:postId', postController.postPut);
router.put('/:postId/comments/:commentId', postController.postCommentPut);

router.delete('/:postId', postController.postDelete);
router.delete('/:postId/comments/:commentId', postController.postCommentDelete);

module.exports = router;
