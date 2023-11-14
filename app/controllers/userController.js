const User = require("../models/User");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.createUser = async (req, res) => {
    try {
        await User.createUserTable();
        var success = false;
        //validate Request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ 
                success, 
                error: "Enter Valid email and password" 
            });
        }

        // Hash password && Create a user
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            user_name: req.body.user_name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: securedPassword
        });

        // Check if user already exists
        const existingUser = await User.findUserByEmail(user.email);
        if (existingUser[0].length > 0) {
            return res.status(409).send({
                success,
                error: "User already exists",
                message: "The user with the provided information already exists."
            });
        }

        // Save user in the database
        const result = await User.insert(user);
        const auth_token = jwt.sign(result, JWT_SECRET, { expiresIn: '1800s' });
        success = true;
        res.json({ success, auth_token });
    } catch (err) {
        res.status(500).send({
            success,
            message: err.message || "Some error occurred while processing the request."
        });
    }
};

exports.signin = async (req, res) => {
    try {
        //validate Request
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            console.log(erros.array());
            return res.status(400).json({ success, error: "Enter valid credentials" });
        }
        //check if user exists
        const existingUser = await User.findUserByEmail(req.body.email);
        if (existingUser[0].length == 0) {
            return res.status(400).send({
                success,
                error: "Enter valid credentials!"
            });
        }
        //compare password
        const savedUser = existingUser[0][0];
        const checkPassword = await bcrypt.compare(req.body.password, savedUser.password);

        if (!checkPassword) {
            return res.status(400).json({ success, error: "Enter valid credentials!" });
        }
        const authtoken = jwt.sign(savedUser, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (err) {
        res.status(500).send({
            success,
            message: err.message || "Some error occurred while processing the request."
        });
    }
};
