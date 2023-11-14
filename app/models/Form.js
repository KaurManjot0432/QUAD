const connection = require('../database/quadDb');

class Form {
  constructor(form) {
    this.owner_id = form.owner_id;
    this.title = form.title;
    this.description = form.description;
  }

  static createFormTableQuery = `
    CREATE TABLE IF NOT EXISTS Form (
      form_id INT AUTO_INCREMENT PRIMARY KEY,
      owner_id INT,
      title VARCHAR(255),
      description VARCHAR(1000),
      FOREIGN KEY (owner_id) REFERENCES User(user_id)
    )
  `;

  static async createFormTable() {
    try {
      await connection.execute(this.createFormTableQuery);
      console.log("created table Form");
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }

  static async insert(newForm) {
    try {
      const res = await connection.execute("INSERT INTO Form (owner_id, title, description) VALUES (?, ?, ?)", 
      [newForm.owner_id, newForm.title, newForm.description]);
      return { form_id: res[0].insertId, ...newForm };
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }

  static async findFormsById(ownerId) {
    try {
      const res = await connection.query("SELECT * FROM Form WHERE owner_id = ?", [ownerId]);
      return res;
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }
  static async findFormOwner(formId) {
    try {
      const res = await connection.query("SELECT owner_id FROM Form WHERE form_id = ?", [formId]);
      return res;
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }
}

module.exports = Form;
