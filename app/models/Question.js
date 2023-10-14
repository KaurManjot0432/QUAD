const connection = require('../models/quadDb');

class Question {
  constructor(question) {
    this.question_type = question.question_type;
    this.question_text = question.question_text;
  }

  static createQuestionTableQuery = `
    CREATE TABLE IF NOT EXISTS Question (
      question_id INT AUTO_INCREMENT PRIMARY KEY,
      question_type VARCHAR(255),
      question_text TEXT UNIQUE
    )
  `;

  static async createQuestionTable() {
    try {
      await connection.execute(this.createQuestionTableQuery);
      console.log("Created table Question");
    } catch (err) {
      throw err;
    }
  }

  static async insert(newQuestion) {
    try {
      const res = await connection.execute(
        "INSERT INTO Question (question_type, question_text) VALUES (?, ?)",
        [newQuestion.question_type, newQuestion.question_text]);
      return { question_id: res[0].insertId, ...newQuestion };
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }

  static async findQuestion(questionText) {
    try {
      const res = await connection.execute(
        "SELECT question_id FROM Question WHERE question_text = ?", [questionText]);
      return res;
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }

  static async findQuestionsByFormId(formId) {
    try{
      const res = await connection.execute(
        "SELECT DISTINCT Question.question_id, Question.question_type, Question.question_text FROM Question INNER JOIN FormQuestion ON Question.question_id = FormQuestion.question_id WHERE FormQuestion.form_id = ?;",
        [formId]
      )
      return res;
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }
}

module.exports = Question;
