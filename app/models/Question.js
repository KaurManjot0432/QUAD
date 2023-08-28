const { connection } = require('../models/quadDb');

// constructor
const Question = function (question) {
  this.question_type = question.question_type;
  this.question_text = question.question_text;
};

const createQuestionTableQuery = `
    CREATE TABLE IF NOT EXISTS Question (
        question_id INT AUTO_INCREMENT PRIMARY KEY,
        question_type VARCHAR(255),
        question_text TEXT UNIQUE
    )
`;

Question.createQuestionTable = () => {
  connection.query(createQuestionTableQuery, (err) => {
    if(err) {
      throw err;
    }
    console.log("Created table Question");
  })
}

Question.insert = (newQuestion, result) => {
  connection.query("INSERT INTO Question SET ?", newQuestion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    console.log(res);
    console.log("At question insert " + res.insertId);
    result(null, {question_id: res.insertId, ...newQuestion });
  });
}

Question.findQuestion = (questionText, result) => {
  connection.query("SELECT question_id FROM Question WHERE question_text = ?", questionText, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    result(null, res);
  });
}

module.exports = Question;
