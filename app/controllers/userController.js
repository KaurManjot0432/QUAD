const User = require("../models/User");

exports.createUser = async (req, res) => {
    try {
        await User.createUserTable();

        // Validate request 
        if (!req.body) {
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        // Create a user
        const user = new User({
            user_name: req.body.user_name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: req.body.password
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
        res.send(result);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while processing the request."
        });
    }
};
