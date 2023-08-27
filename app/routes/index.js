const express = require('express');
const router = express.Router();
const users = require("../controllers/userController.js");
const forms = require("../controllers/formController.js");
const questions = require("../controllers/questionController.js");

router.post('/createUser', (req, res) => {
    users.create(req, res);
})

router.post('/createForm', (req, res) => {
    forms.create(req, res);
})

router.post('/saveQuestion', (req, res) => {
    questions.create(req, res);
})

module.exports = router;