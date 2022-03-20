const express = require('express');
const router = express.Router();
const messagesCtrl = require('../../controllers/api/messages');


router.post('/new', messagesCtrl.new)
router.get('/:userId/:friendId', messagesCtrl.grabConversation);

module.exports = router;