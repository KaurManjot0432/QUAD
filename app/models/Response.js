const connection = require('../models/quadDb');

class Response {
  constructor(response) {
    this.form_id = response.form_id;
    this.user_id = response.user_id;
  }

  static createResponseTableQuery = `
    CREATE TABLE IF NOT EXISTS Response (
      response_id INT AUTO_INCREMENT PRIMARY KEY,
      form_id INT,
      user_id INT,
      submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (form_id) REFERENCES Form(form_id),
      FOREIGN KEY (user_id) REFERENCES User(user_id)
    )
  `;

  static async createResponseTable() {
    try {
      await connection.execute(this.createResponseTableQuery);
      console.log("created table Response");
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }

  static async insert(newResponse) {
    try {
      const res = await connection.execute(
        "INSERT INTO Response (form_id, user_id) VALUES (?, ?)",
        [newResponse.form_id, newResponse.user_id]);
      return { response_id: res[0].insertId, ...newResponse };
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }

  static async find(userId, formId) {
    try {
      const res = await connection.execute(
        "SELECT response_id FROM Response WHERE user_id = ? AND form_id = ?",
        [userId, formId]);
      return res;
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }
}

module.exports = Response;
