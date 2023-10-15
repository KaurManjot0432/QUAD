import React from "react";
import { Link } from 'react-router-dom';

const FormItem = (props) => {
    const {form, addQues} = props;
    return (
        <div className="col-md-3">
            <div class="card my-3">
                <div class="card-body">
                    <h5 class="card-title">{form.title}</h5>
                    <p class="card-text">{form.description}</p>
                    <p class="card-text"><Link to={`/form/${form.form_id}`}>Open Form</Link></p>
                    <p class="card-text"><Link to={`http://localhost:3001/api/formResponses?form_id=${form.form_id}`}>Download Responses</Link></p>
                    <i className="fas fa-edit mx-2" onClick={()=>{addQues(form)}}></i>
                    <i className="fas fa-trash-alt mx-2"></i>
                </div>
            </div>
        </div>
    )
}

export default FormItem;