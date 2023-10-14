const Response = require("../models/Response");
const QuestionResponse = require("../models/QuestionResponse");
const User = require("../models/User");
require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.saveFormResponse = async (req, res) => {
    try {
        await Response.createResponseTable();
        await QuestionResponse.createQuestionResponseTable();

        // Validate request
        if (!req.body) {
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        // Create a response
        const response = new Response({
            form_id: req.body.form_id,
            user_id: req.user.id,
        });

        // Check if user has already responded
        const existingResponse = await Response.find(response.user_id, response.form_id);

        if (existingResponse[0].length > 0) {
            return res.status(409).send({
                "error": "User already responded",
                "message": "The user with the provided information already responded to the form."
            });
        }

        // Save response
        const insertedResponse = await Response.insert(response);

        for (const question of req.body.questions) {
            const questionId = question.question_id;
            const answerText = question.answer_text;
            const questionResponse = new QuestionResponse({
                response_id: insertedResponse.response_id,
                question_id: questionId,
                answer_text: answerText
            });

            await QuestionResponse.insert(questionResponse);
        }

        const userData = await User.findUserById(req.user.id);
        const customerEmail = userData[0][0].email;
        const customerName = userData[0][0].user_name;
        const customerNumber = userData[0][0].phone_number;

        // Generate the SMS content based on customer details
        const smsContent = `Hello ${customerName}, thank you for your response. Your email is ${customerEmail}.`;

        // Send the SMS
        client.messages
            .create({
                body: smsContent,
                from: process.env.SERVICE_PROVIDER_NUMBER,
                to: customerNumber
            })
            .then(message => console.log(message.sid))
            .catch(error => console.error('Error sending SMS:', error));

        res.send(insertedResponse);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while processing the request."
        });
    }
}
