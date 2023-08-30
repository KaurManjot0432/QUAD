const query = require("../models/query");
const fs = require("fs").promises;

exports.getFormResponses = async (req, res) => {
    try {
        const resultData = await query.getAllResponses(req.query.form_id);
        console.log(resultData);
        // Transform the data into the desired format
        const transformedData = {};
        resultData[0].forEach(row => {
            const key = "response_id-user_name-submission_time";

            if (!transformedData[key]) {
                transformedData[key] = [];
            }

            transformedData[key].push(row.question_text);
        });
        resultData[2].forEach(row => {
            const key = `${row.response_id}-${row.user_name}-${row.submission_time}`;

            if (!transformedData[key]) {
                transformedData[key] = [];
            }

            transformedData[key].push(row.answer_text);
        });

        // Convert the transformed data into CSV-formatted rows
        const csvRows = [];
        for (const key in transformedData) {
            const [responseId, userName, submissionTime] = key.split('-');
            csvRows.push([responseId, userName, submissionTime, ...transformedData[key]].join(','));
        }
        const csvContent = csvRows.join('\n');

        // Specify the file path
        const filePath = 'data.csv';

        // Write the CSV content to the file
        await fs.writeFile(filePath, csvContent);
        console.log('CSV file has been written successfully.');

        res.send(resultData);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({
            message: err.message || "Some error occurred while fetching the query results."
        });
    }
}
