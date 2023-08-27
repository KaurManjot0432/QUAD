const { connection } = require('../models/quadDb');

// constructor
const FormQuestion = function (formQuestion) {
  this.form_id = formQuestion.form_id;
  this.question_id = formQuestion.question_id;
};

const createFormQuestionTableQuery = `
    CREATE TABLE IF NOT EXISTS FormQuestion (
        form_question_id INT AUTO_INCREMENT PRIMARY KEY,
        form_id INT,
        question_id INT,
        FOREIGN KEY (form_id) REFERENCES Form(form_id),
        FOREIGN KEY (question_id) REFERENCES Question(question_id)
    )
`;

FormQuestion.createFormQuestionTable = () => {
  connection.query(createFormQuestionTableQuery, (err) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created table FormQuestion");
  })
}

FormQuestion.insert = (newFormQuestion, result) => {
  console.log("inserting lkssksdf");
  console.log(newFormQuestion.question_id);
  connection.query("INSERT INTO FormQuestion SET ?", newFormQuestion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { form_question_id: res.insertId, ...newFormQuestion });
  });
}
module.exports = FormQuestion;
