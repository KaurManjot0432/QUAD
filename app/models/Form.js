const { connection } = require('../models/quadDb');

// constructor
const Form = function (form) {
  this.owner_id = form.owner_id;
  this.title = form.title;
  this.description = form.description;
};

const createFormTableQuery = `
  CREATE TABLE IF NOT EXISTS Form (
    form_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT,
    title VARCHAR(255),
    description VARCHAR(1000),
    FOREIGN KEY (owner_id) REFERENCES User(user_id)
  )
`;

Form.createFormTable = () => {
  connection.query(createFormTableQuery, (err) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created table Form");
  })
}

Form.insert = (newForm, result) => {
  connection.query("INSERT INTO Form SET ?", newForm, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, {form_id: res.insertId, ...newForm });
  });
}

module.exports = Form;