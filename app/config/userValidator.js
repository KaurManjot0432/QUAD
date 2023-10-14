const { body } = require('express-validator')

exports.validateUser = [
    body('user_name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
];

exports.signin = [
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password can not be blank!').isLength({ min : 1 })
];