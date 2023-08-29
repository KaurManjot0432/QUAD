const connection = require('../models/quadDb');

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

exports.getAllResponses = async (formId) => {
    try {
        const questions = await executeQuery(getAllQuestionsForGivenFormIdQuery, formId);
        const responses = await executeQuery(getAllResponsesForGivenFormIdQuery, formId);
        
        const combinedRes = [...questions, ...responses];
        return combinedRes;
    } catch (err) {
        console.log("error: ", err);
        throw err;
    }
}

async function executeQuery(query, params) {
    const res = await connection.execute(query, [params]);
    return res;
}
