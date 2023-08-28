const Response = require("../models/Response");
const QuestionResponse = require("../models/QuestionResponse");

exports.save = (req, res) => {
    Response.createResponseTable();
    QuestionResponse.createQuestionResponseTable();
    // Validate request
    if (!req.body) {
        return res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a response
    const response = new Response({
        form_id: req.body.form_id,
        user_id: req.body.user_id,
    });
    
    //check if user has already responded
    Response.find(response.user_id, response.form_id, (err, result) => {
        if (err) {
            res.status(500).send({
              message: err.message || "Some error occurred while checking response existence."
            });
          } else {
            if(result.length > 0) {
                res.status(409).send({
                    "error": "User already responded",
                    "message": "The user with the provided information already responded to the form."
                });
            } else {
                // Save response
                Response.insert(response, (err, result) => {
                    if (err)
                        res.status(500).send({
                            message:
                            err.message || "Some error occurred while inserting the Response."
                        });
                    else {
                        req.body.questions.forEach((question) => {
                            // Access the question_id
                            console.log("Accessing the question " + question);
                            const questionId = question.question_id;
                            const answerText = question.answer_text;
                            console.log(`Question ID: ${questionId}, Text Answer: ${answerText}`);
                            const questionResponse = new QuestionResponse({
                                response_id : result.response_id,
                                question_id : questionId,
                                answer_text : answerText
                            });
                            QuestionResponse.insert(questionResponse, (err, data) => {
                                if(err) {
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while inserting questionResponse."
                                      });
                                } 
                                console.log(`Inserted Question ID: ${questionId}, Text Answer: ${answerText}, question_answer_id: ${data.insertId}`);
                            })
                        })
                        res.send(result);
                    }
                })
            }
          }
    })
}