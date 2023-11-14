const connection = require('../database/quadDb');

class FormQuestion {
  constructor(formQuestion) {
    this.form_id = formQuestion.form_id;
    this.question_id = formQuestion.question_id;
  }

  static createFormQuestionTableQuery = `
    CREATE TABLE IF NOT EXISTS FormQuestion (
      form_question_id INT AUTO_INCREMENT PRIMARY KEY,
      form_id INT,
      question_id INT,
      FOREIGN KEY (form_id) REFERENCES Form(form_id),
      FOREIGN KEY (question_id) REFERENCES Question(question_id)
    )
  `;

  static async createFormQuestionTable() {
    try {
      await connection.execute(this.createFormQuestionTableQuery);
      console.log("created table FormQuestion");
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }

  static async insert(newFormQuestion) {
    try {
      const res = await connection.execute(
        "INSERT INTO FormQuestion (form_id, question_id) VALUES (?, ?)",
        [newFormQuestion.form_id, newFormQuestion.question_id]);
      return { form_question_id: res[0].insertId, ...newFormQuestion };
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }
}

module.exports = FormQuestion;
