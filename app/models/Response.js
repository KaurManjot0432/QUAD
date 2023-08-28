const { connection } = require('../models/quadDb');

const Response = function (response) {
  this.form_id = response.form_id;
  this.user_id = response.user_id;
};

const createResponseTableQuery = `
  CREATE TABLE IF NOT EXISTS Response (
    response_id INT AUTO_INCREMENT PRIMARY KEY,
    form_id INT,
    user_id INT,
    submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES Form(form_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
  )
`;

Response.createResponseTable = () => {
  connection.query(createResponseTableQuery, (err) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created table Response");
  })
}

Response.insert = (newResponse, result) => {
  connection.query("INSERT INTO Response SET ?", newResponse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, {response_id: res.insertId, ...newResponse });
  });
}


Response.find = (userId, formId, result) => {
    connection.query("SELECT response_id FROM Response WHERE user_id = ? AND form_id = ?", [userId, formId], (err, res) => {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      } 
      result(null, res);
    })
}

module.exports = Response;