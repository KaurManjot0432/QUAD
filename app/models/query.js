const { connection } = require('../models/quadDb');

const getAllQuestionsForGivenFormIdQuery = `
    SELECT Q.question_text
    FROM Question Q
    JOIN FormQuestion FQ ON FQ.question_id = Q.question_id
    JOIN Form F ON F.form_id = FQ.form_id
    WHERE F.form_id = ?
    ORDER BY Q.question_id;
`;

const getAllResponsesForGivenFormIdQuery = `
    SELECT R.response_id, U.user_name, R.submission_time, QR.answer_text 
    FROM Response R 
    JOIN QuestionResponse QR ON QR.response_id = R.response_id 
    JOIN Form F ON F.form_id = R.form_id 
    JOIN User U ON U.user_id = R.user_id 
    WHERE F.form_id = ?
    ORDER BY R.response_id, QR.question_id;
`;

exports.getAllResponses = (formId, result) => {
    connection.query(getAllQuestionsForGivenFormIdQuery, formId, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            connection.query(getAllResponsesForGivenFormIdQuery, formId, (err, res2) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                const combinedRes = [...res1, ...res2];
                console.log(combinedRes);
                result(null, combinedRes);
            })
        }
    })
}
