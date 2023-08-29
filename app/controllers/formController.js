const Form = require("../models/Form");

exports.createForm = async (req, res) => {
    try {
        await Form.createFormTable();

        // Validate request
        if (!req.body) {
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        // Create a form
        const form = new Form({
            title: req.body.title,
            description: req.body.description,
            owner_id: req.body.owner_id,
        });

        // Save form in the database
        const insertedForm = await Form.insert(form);
        console.log(insertedForm);
        res.send(insertedForm);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while processing the request."
        });
    }
};
