const express = require('express');
const router = express.Router();
const forms = require("../controllers/formController.js");
const questions = require("../controllers/questionController.js");
const responses = require("../controllers/responseController.js");
const query = require("../controllers/queryController.js");
var fetchUser = require("../middlewares/user/fetchUser.js");
const { validateForm, validateQuestion } = require("../middlewares/form/form.validator.js");

router.get('/', fetchUser, (req, res) => {
    forms.getForms(req, res);
})

router.post('/createForm', fetchUser, validateForm, (req, res) => {
    forms.createForm(req, res);
})

router.post('/createQuestion', fetchUser, validateQuestion, (req, res) => {
    questions.saveFormQuestion(req, res);
})

router.get('/questions/:formId', fetchUser, (req, res) => {
    questions.findFormQuestions(req, res);
})

router.post('/response/:formId', fetchUser, (req, res) => {
    responses.saveFormResponse(req, res);
})

router.get('/responses/:formId', fetchUser, (req, res) => {
    query.getFormResponses(req, res);
})

module.exports = router;