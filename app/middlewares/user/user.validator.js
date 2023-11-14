const { body } = require('express-validator')

exports.validateUser = [
    body('user_name').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone_number').exists().isMobilePhone().withMessage('Invalid phone number')
];

exports.signin = [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank!').isLength({ min: 1 })
];