const { connection } = require('../models/quadDb');

const QuestionResponse = function (questionResponse) {
    this.response_id = questionResponse.response_id;
    this.question_id = questionResponse.question_id;
    this.answer_text = questionResponse.answer_text;
};

const createQuestionResponseTableQuery = `
    CREATE TABLE IF NOT EXISTS QuestionResponse (
        question_response_id INT AUTO_INCREMENT PRIMARY KEY,
        response_id INT,
        question_id INT,
        answer_text TEXT,
        FOREIGN KEY (response_id) REFERENCES Response(response_id),
        FOREIGN KEY (question_id) REFERENCES Question(question_id)
    )
`;

QuestionResponse.createQuestionResponseTable = () => {
  connection.query(createQuestionResponseTableQuery, (err) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created table QuestionResponse");
  })
}

QuestionResponse.insert = (newQuestionResponse, result) => {
  connection.query("INSERT INTO QuestionResponse SET ?", newQuestionResponse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, {question_response_id: res.insertId, ...newQuestionResponse });
  });
}

module.exports = QuestionResponse;