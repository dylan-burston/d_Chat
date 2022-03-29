const express = require('express');
const router = express.Router();
const messagesCtrl = require('../../controllers/api/messages');

router.get('/:userId/:friendId', messagesCtrl.grabConversation);
router.post('/new', messagesCtrl.new)

module.exports = router;