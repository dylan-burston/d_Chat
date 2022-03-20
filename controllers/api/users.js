const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT = 6


// login function 

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email});
        console.log((await bcrypt.compareSync(req.body.password, user.password)))
        if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
        res.status(200).json(token);
    } catch (err) {
        res.status(400).json('Bad Login Credentials');
    }
}

async function createUser(req, res) {
    try {
        console.log(req.body.password)
        const hashedPassword = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT))
        const user = await User.create({name: req.body.name, email: req.body.email, password: hashedPassword});
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
        res.status(200).json(token);
    } catch (err) {
        res.status(400).json(err);
    }
}


module.exports = {
    create: createUser,
    login
} 