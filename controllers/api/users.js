const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let currentUser;

async function createUser(req, res) {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)
        const user = await User.create({name: req.body.name, email: req.body.email, password: hashedPassword});
        currentUser = user;
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
        res.status(200).json(token);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email});
        currentUser = user;
        if (!bcrypt.compareSync(req.body.password, user.password)) throw new Error();
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
        res.status(200).json(token);
    } catch (err) {
        res.status(400).json('Bad Login Credentials');
    }
}

async function show(req, res) {
    try {
      let user = await User.findById(req.params.userId);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
}

async function index(req, res) {
    try {
        let users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function newFriend(req, res) {
    try {
        let user = await User.findById(req.params.userId)
        if (!user.friends.includes(req.params.friendId)) await user.friends.push(req.params.friendId);
        await user.save()
        currentUser = user;
        res.status(200).send('Done')
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getFriends(req, res) {
    try {
        let allUsers = await User.find({});
        let currentUser = await User.findById(req.params.userId);
        let notYou = allUsers.filter(user => user.id !== currentUser.id);
        let friends = []
        notYou.forEach(async (user) => user.friends.forEach( id => {
            if (id == currentUser.id && currentUser.friends.includes(user.id)) {
                console.log("user is", user);
                friends.push(user);
            }
        }))
        res.status(200).json(friends);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function updateProfile(req, res) {
    try {
        let user = await User.findById(req.params.userId);
        user.profilePic = req.body.profilePic;
        user.save();
    } catch (err) {
        res.status(400).json(err)
    }
}

async function deleteUser(req, res) {
    try {
        await User.findByIdAndDelete(req.params.userId);
        let users = await User.find({})
        users.forEach( user => {
            user.friends.filter(id => id !== req.params.userId)
            user.save();
        })
        res.status(200).send('Done')
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    login,
    create: createUser,
    show,
    index,
    newFriend,
    getFriends,
    updateProfile,
    deleteUser,
}