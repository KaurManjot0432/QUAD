const Form = require("../models/Form");

exports.createForm = async (req, res) => {
    Form.createFormTable();
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
    Form.insert(form, (err, result) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while inserting the form."
            });
        else {
            console.log(result);
            res.send(result);
        }
    });
};
