const Form = require("../models/Form");

exports.createForm = async (req, res) => {
    var success = false;
    try {
        await Form.createFormTable();
        // Validate request
        if (!req.body) {
            return res.status(400).send({
                success,
                error: "Content can not be empty!"
            });
        }

        // Create a form
        const form = new Form({
            title: req.body.title,
            description: req.body.description,
            owner_id: req.user.user_id,
        });
        // Save form in the database
        const insertedForm = await Form.insert(form);
        console.log(insertedForm);
        success = true;
        res.send({ success, insertedForm });
    } catch (err) {
        res.status(500).send({
            success,
            error: err.message || "Some error occurred while processing the request."
        });
    }
};

exports.getForms = async (req, res) => {
    try {
        const formsbyId = await Form.findFormsById(req.user.user_id);
        console.log(formsbyId[0]);
        res.send({ success: true, forms: formsbyId[0] });
    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while processing the request."
        });
    }
}