const Question = require("../models/Question");
const FormQuestion = require("../models/FormQuestion");

exports.save = (req, res) => {
  Question.createQuestionTable();

  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a question
  const question = new Question({
    question_type: req.body.question_type,
    question_text: req.body.question_text,
  });
  var formQuestion = new FormQuestion({
    form_id: req.body.form_id
  });

  //check if question already exists
  Question.findQuestion(question.question_text, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while checking question existence."
      });
    } else {
      if (result.length > 0) {
        formQuestion.question_id = result[0].question_id;
        // Associate the question with the form

        FormQuestion.createFormQuestionTable();
        FormQuestion.insert(formQuestion, (err, result) => {
          if (err) {
            res.status(500).send({
              message: err.message || "Some error occurred while inserting formQuestion."
            });
          } else {
            res.send(result);
          }
        });
      } else {
        Question.insert(question, (err, result) => {
          if (err) {
            res.status(500).send({
              message: err.message || "Some error occurred while inserting question."
            });
          } else {
            formQuestion.question_id = result.question_id;
            // Associate the question with the form

            FormQuestion.createFormQuestionTable();
            FormQuestion.insert(formQuestion, (err, result) => {
              if (err) {
                res.status(500).send({
                  message: err.message || "Some error occurred while inserting formQuestion."
                });
              } else {
                res.send(result);
              }
            });
          }
        });
      }
    }
  });
}
