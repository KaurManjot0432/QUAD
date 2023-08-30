const express = require('express');
const router = express.Router();
const users = require("../controllers/userController.js");
const forms = require("../controllers/formController.js");
const questions = require("../controllers/questionController.js");
const responses = require("../controllers/responseController.js");
const query = require("../controllers/queryController.js");
const validator = require("../config/userValidator.js");

router.post('/api/createUser', validator.validateUser, (req, res) => {
    users.createUser(req, res);
})

router.post('/api/createForm', (req, res) => {
    forms.createForm(req, res);
})

router.post('/api/saveFormQuestion', (req, res) => {
    questions.saveFormQuestion(req, res);
})

router.post('/api/saveFormResponse', (req, res) => {
    responses.saveFormResponse(req, res);
})

router.get('/api/formResponses', (req, res) => {
    query.getFormResponses(req, res);
})

module.exports = router;