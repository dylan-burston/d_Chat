
const User = require('../../models/user');
const Message = require('../../models/message');
const jwt = require('jsonwebtoken');

async function grabConversation(req, res) {
    try {
        let messagesSent = await Message.find({senderId: req.params.userId, receiverId: req.params.friendId});
        let messagesReceived = await Message.find({senderId: req.params.friendId, receiverId: req.params.userId})
        messages = [messagesSent, messagesReceived].flat().sort(function(a, b) {return a.createdAt - b.createdAt})
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

async function deleteMessages(req, res) {
    try {
        await Message.deleteMany({senderId: req.params.userId});
        await Message.deleteMany({receiverId: req.params.userId});
        res.status(200).send('Done');
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    grabConversation,
    new: newMessage,
    deleteMessages
}