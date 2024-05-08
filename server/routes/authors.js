const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorController');

router.get('/', authorController.allAuthorsGet);
router.get('/:authorId', authorController.authorGet);

router.post('/', authorController.authorPost);

router.put('/:authorId', authorController.authorPut);

router.delete('/:authorId', authorController.authorDelete);

module.exports = router;
