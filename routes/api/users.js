const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');



router.post('/signup', usersCtrl.create);


module.exports = router;