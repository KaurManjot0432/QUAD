const User = require("../models/User");

exports.createUser = (req, res) => {
    User.createUserTable();
    // Validate request 
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a user
    const user = new User({
      user_name : req.body.user_name,
      phone_number : req.body.phone_number,
      email : req.body.email,
      password : req.body.password
    });

    // Check if user already exists
    User.findUserByEmail(user.email, (err, result) => {
      if(err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while finding existance of user."
        });
      } else {
        if(result.length > 0) {
          res.status(409).send({
            "error": "User already exists",
            "message": "The user with the provided information already exists."
          });
        } else {
          // Save user in the database
          User.insert(user, (err, result) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while inserting the User."
              });
            else res.send(result);
          });
        }
      }
    });
  };
  