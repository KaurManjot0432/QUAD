import React, { useState, useEffect, useContext} from 'react';
import {useParams, useNavigate } from 'react-router-dom';

import FormContext from '../context/forms/FormContext';

function FormQuestions() {
    const context = useContext(FormContext);
    const {findFormQuestions, formQuestions, saveFormRespone} = context;
    const {formId} = useParams();
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        console.log(formId);
        findFormQuestions(formId);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnswers({ ...answers, question_id : name, answer_text: value });
    };

    const handleSubmit = () => {
       saveFormRespone(formId, answers);
       navigate('/');
    };

    return (
        <div>
            <h2>Form Questions</h2>
            <form>
                {formQuestions.map(question => (
                    <div key={question.question_id}>
                        <label htmlFor={question.question_id}>{question.question_text}</label>
                        <input
                            type="text"
                            name={question.question_id}
                            value={answers[question.question_id]}
                            onChange={handleInputChange}
                        />
                    </div>
                  
                ))}
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default FormQuestions;
