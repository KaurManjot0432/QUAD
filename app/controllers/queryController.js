const query = require("../models/query");
const formQuery = require("../models/Form");
const { google } = require('googleapis');

// Load the credentials file downloaded from the Google Cloud Console
const credentials = require('../../credentials.json');

// Create a new JWT client using the credentials
const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

exports.getFormResponses = async (req, res) => {
    try {

        const { formId } = req.params;

        const formOwner = await formQuery.findFormOwner(formId);
        if (!formOwner | formOwner[0][0].owner_id !== req.user.user_id) {
            return res.status(400).send({
                success: false,
                error: "User not authorised to perform this action."
            });
        }

        // Fetching the data to write to the Google Sheets

        const resultData = await query.getAllResponses(formId);

        // Transform the data into the desired format
        const sheetRows = [];
        const transformedData = {};
        const firstRow = ['response_id', 'user_name', 'submission_time'];
        resultData[0].forEach(row => {
            firstRow.push(row.question_text);
        });
        sheetRows.push(firstRow);
        resultData[2].forEach(row => {
            const key = `${row.response_id}-${row.user_name}-${row.submission_time}`;
            if (!transformedData[key]) {
                transformedData[key] = [];
            }
            transformedData[key].push(row.answer_text);
        });

        for (const key in transformedData) {
            if (transformedData.hasOwnProperty(key)) {
                const [responseId, userName, submissionTime] = key.split('-');
                const row = [responseId, userName, submissionTime, ...transformedData[key]];
                // append current values of key in row
                sheetRows.push(row);
            }
        }
        const sheets = google.sheets({ version: 'v4', auth });

        // Define the spreadsheetId and range
        const spreadsheetId = '18e2sni7OxXalM9IVzu7TgbhbTy-54QbNZ6Us6xIs_Ws';
        const range = 'Sheet1';

        // Clear the existing content in the range
        await sheets.spreadsheets.values.clear({
            spreadsheetId,
            range,
        });

        // Write the new data to the range
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource: {
                values: sheetRows,
            },
        });

        res.send({ success: true, result: sheetRows });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({
            success: false,
            error: err.message || "Some error occurred while fetching the query results."
        });
    }
}
