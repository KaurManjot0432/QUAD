const User = require("../models/User");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'ManjotisWorkInG$onQuaDProJecT';

exports.createUser = async (req, res) => {
    try {
        await User.createUserTable();

        //validate Request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
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
                error: "User already exists",
                message: "The user with the provided information already exists."
            });
        }

        // Save user in the database
        const result = await User.insert(user);
        const data = {
            user:{
              id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET,  { expiresIn: '1800s' });

        res.json({ auth_token })
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while processing the request."
        });
    }
};

exports.signin = async (req, res) => {
    try{
        //validate Request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const existingUser = await User.findUserByEmail(req.body.email);
        if (existingUser[0].length == 0) {
            return res.status(400).send({
                error: "Enter valid credentials!"
            });
        }
        const savedUser = existingUser[0][0];
        const checkPassword = await bcrypt.compare(req.body.password, savedUser.password);

        if (!checkPassword) {
            return res.status(400).json({ error: "Enter valid credentials!" });
        }

        const data = {
            user: {
                id: savedUser.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({ authtoken })

    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while processing the request."  
        });
    }
};

exports.getProfile = async (req,res)=>{
    try{
        const userId = req.user.id;
        // const User = await user.findById(userId).select("-password");
        // if(!User){ 
        //     return res.status(401).json({error : "Access Denied!"});
        // }
        res.send(userId);
    } catch(err){
        console.error(err);
        return res.status(500).send("some error occured");
    }

}