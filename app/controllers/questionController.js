const Question = require("../models/Question");
const FormQuestion = require("../models/FormQuestion");
const formQuery = require("../models/Form");

exports.saveFormQuestion = async (req, res) => {
  var success = false;
  try {
    await Question.createQuestionTable();
    await FormQuestion.createFormQuestionTable();

    // Validate request
    if (!req.body) {
      return res.status(400).send({
        success,
        error: "Content can not be empty!"
      });
    }
    const formOwner = await formQuery.findFormOwner(req.body.form_id);
    if (!formOwner | formOwner[0][0].owner_id !== req.user.user_id) {
        return res.status(400).send({
            success: false,
            error: "User not authorised to perform this action."
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
    success = true;
    res.send({success, result: insertedFormQuestion});
  } catch (err) {
    res.status(500).send({
      success,
      error: err.message || "Some error occurred while processing the request."
    });
  }
};

exports.findFormQuestions = async (req, res) => {
  try{

    const {formId} = req.params;
    console.log(formId);
    const response = await Question.findQuestionsByFormId(formId);
    console.log(response);
    res.send({success: true, result: response[0]});
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err.message || "Some error occurred while processing the request."
    });
  }
}
