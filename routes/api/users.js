const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

router.post('/login', usersCtrl.login);
router.post('/signup', usersCtrl.create);
router.get('/', usersCtrl.index);
router.get('/:userId/friends', usersCtrl.getFriends)
router.get('/:userId', usersCtrl.show);
router.delete('/:userId', usersCtrl.deleteUser)
router.post('/:userId/:friendId/new', usersCtrl.newFriend)
router.put('/:userId/update', usersCtrl.updateProfile)

module.exports = router;