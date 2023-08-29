const query = require("../models/query");
var fs = require("fs");

exports.getFormResponses = (req, res) => {
    query.getAllResponses(req.query.form_id, (err, resultData) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the query results."
            });
        } else {
            // Transform the data into the desired format
            const transformedData = {};
            resultData.forEach(row => {
                let key;
                if(row.question_text) {
                    key = "response_id-user_name-submission_time";
                    if(!transformedData[key]) {
                        transformedData[key] = [];
                    }
                    transformedData[key].push(row.question_text);
                } else {
                    key = `${row.response_id}-${row.user_name}-${row.submission_time}`;
                    if (!transformedData[key]) {
                        transformedData[key] = [];
                    }
                    transformedData[key].push(row.answer_text);
                }
            });

            // Convert the transformed data into CSV-formatted rows
            const csvRows = [];
            for (const key in transformedData) {
                const [responseId, userName, submission_time] = key.split('-');
                csvRows.push([responseId, userName, submission_time, ...transformedData[key]].join(','));
            }
            const csvContent = csvRows.join('\n');

            // Specify the file path
            const filePath = 'data.csv';

            // Write the CSV content to the file
            fs.writeFile(filePath, csvContent, err => {
                if (err) {
                    console.error('Error writing CSV file:', err);
                } else {
                    console.log('CSV file has been written successfully.');
                }
            });
            res.send(resultData);
        }
    })
}

