const { connection } = require('../models/quadDb');


    const User =  function(user) {
        this.user_name = user.user_name;
        this.phone_number = user.phone_number;
        this.email = user.email;
        this.password = user.password;
    }

    User.createUserTable = () => {
        const createUserTableQuery = `
            CREATE TABLE IF NOT EXISTS User (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                user_name VARCHAR(255),
                phone_number VARCHAR(10),
                email VARCHAR(255) UNIQUE,
                password VARCHAR(255)
            )
        `;

        connection.query(createUserTableQuery, (err, res) => {
          if(err) {
            throw err;
          }
          console.log("Created table User");
        })
    }

    User.insert = (newUser, result) => {
      connection.query("INSERT INTO User SET ?", newUser, (err, res) => {
        if(err) {
          console.log("error: ", err);
          result(err, null);
        } 
        result(null, {user_id : res.insertId, ...newUser});
      });
    }

     User.findUserByEmail = (userEmail, result) => {
      connection.query("SELECT user_id FROM User WHERE email = ?", userEmail, (err, res) => {
        if(err) {
          console.log("error: ", err);
          result(err, null);
        } 
        result(null, res);
      })
      
  }


module.exports = User;
