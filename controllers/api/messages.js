const User = require('../../models/user');
const Message = require('../../models/message');
const jwt = require('jsonwebtoken');

async function grabConversation(req, res) {
    try {
        let messages = await Message.find({senderId: req.params.userId, receiverId: req.params.friendId});
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function newMessage(req, res) {
    try {
        await Message.create(req.body);
        res.status(200).send('Done')
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    grabConversation,
    new: newMessage,
}