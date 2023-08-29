const Question = require("../models/Question");
const FormQuestion = require("../models/FormQuestion");

exports.saveFormQuestion = async (req, res) => {
  try {
    await Question.createQuestionTable();
    await FormQuestion.createFormQuestionTable();

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
    
    const formQuestion = new FormQuestion({
      form_id: req.body.form_id
    });

    // Check if question already exists
    const existingQuestion = await Question.findQuestion(question.question_text);

    if (existingQuestion[0].length > 0) {
      formQuestion.question_id = existingQuestion[0][0].question_id;
    } else {
      const insertedQuestion = await Question.insert(question);
      formQuestion.question_id = insertedQuestion.question_id;
    }

    // Associate the question with the form
    const insertedFormQuestion = await FormQuestion.insert(formQuestion);

    res.send(insertedFormQuestion);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while processing the request."
    });
  }
};
