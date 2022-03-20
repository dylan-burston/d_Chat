const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

router.post('/login', usersCtrl.login);
router.post('/signup', usersCtrl.create);
router.get('/', usersCtrl.index);
router.get('/friends', usersCtrl.getFriends)
router.post('/:userId/:friendId/new', usersCtrl.newFriend)

module.exports = router;