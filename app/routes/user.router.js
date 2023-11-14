const express = require('express');
const router = express.Router();
const users = require("../controllers/userController.js");
const validator = require("../middlewares/user/user.validator.js");
var fetchUser = require("../middlewares/user/fetchUser.js");

router.post('/signup', validator.validateUser, (req, res) => {
    users.createUser(req, res);
})

router.post('/signin', validator.signin, (req, res) => {
    users.signin(req, res);
})


module.exports = router;