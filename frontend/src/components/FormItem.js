import React from "react";

const FormItem = (props) => {
    const {form} = props;
    return (
        <div className="col-md-3">
            <div class="card my-3">
                <div class="card-body">
                    <h5 class="card-title">{form.title}</h5>
                    <p class="card-text">{form.description}</p>
                    <i className="fas fa-edit mx-2"></i>
                    <i className="fas fa-trash-alt mx-2"></i>
                </div>
            </div>
        </div>
    )
}

export default FormItem;