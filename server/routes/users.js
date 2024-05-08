const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.allUsersGet);
router.get('/:userId', userController.allUsersGet);

router.post('/', userController.userPost);

router.put('/:userId', userController.userPut);

router.delete('/:userId', userController.userDelete);

module.exports = router;
