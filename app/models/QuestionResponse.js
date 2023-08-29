const connection = require('../models/quadDb');

class QuestionResponse {
  constructor(questionResponse) {
    this.response_id = questionResponse.response_id;
    this.question_id = questionResponse.question_id;
    this.answer_text = questionResponse.answer_text;
  }

  static createQuestionResponseTableQuery = `
    CREATE TABLE IF NOT EXISTS QuestionResponse (
      question_response_id INT AUTO_INCREMENT PRIMARY KEY,
      response_id INT,
      question_id INT,
      answer_text TEXT,
      FOREIGN KEY (response_id) REFERENCES Response(response_id),
      FOREIGN KEY (question_id) REFERENCES Question(question_id)
    )
  `;

  static async createQuestionResponseTable() {
    try {
      await connection.execute(this.createQuestionResponseTableQuery);
      console.log("created table QuestionResponse");
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }

  static async insert(newQuestionResponse) {
    try {
      const res = await connection.execute(
        "INSERT INTO QuestionResponse (response_id, question_id, answer_text) VALUES (?, ?, ?)", 
        [newQuestionResponse.response_id, newQuestionResponse.question_id, newQuestionResponse.answer_text]);
      return { question_response_id: res[0].insertId, ...newQuestionResponse };
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }
}

module.exports = QuestionResponse;
