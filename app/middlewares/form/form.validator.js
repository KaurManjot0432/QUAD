const { body } = require('express-validator')

exports.validateForm = [
    body('title', 'Form title must be atleat 3 characters long').isLength({ min: 3 }),
    body('description', 'Password can not be blank!').isLength({ min: 1 })
];

exports.validateQuestion = [
    body('question_text', 'Form Question must be atleat 3 characters long').isLength({ min: 3 }),
];