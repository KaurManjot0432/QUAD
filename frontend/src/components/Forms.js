import React, { useContext, useEffect, useRef, useState } from 'react'
import FormContext from '../context/forms/FormContext';
import FormItem from './FormItem';

const Forms = () => {
    const context = useContext(FormContext);
    const {forms, getForms, addQuestion} = context;
    useEffect(() => {
        getForms()
    }, []);

    const ref = useRef(null)
    const refClose = useRef(null)
    const [ques, setQues] = useState({form_id: "", question_type: "", question_text: ""})

    const addQues = (currentQuestion) => {
        ref.current.click();
        setQues({
            form_id: currentQuestion.form_id
        })
    }

    const handleClick = (e)=>{ 
        addQuestion(ques.form_id, ques.question_type, ques.question_text);
        setQues({
            form_id : "",
            question_type : "",
            question_text : ""
        })
        refClose.current.click();
    }

    const onChange = (e)=>{
        setQues({...ques, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add a Question</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Question Type</label>
                                    <input type="text" className="form-control" id="question_type" name="question_type" value={ques.question_type} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Question Text</label>
                                    <input type="text" className="form-control" id="question_text" name="question_text" value={ques.question_text} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Add Question</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Forms</h2>
                <div className="container mx-2"> 
                {forms.length===0 && 'No forms to display'}
                </div>
                {forms.map((form) => {
                    return <FormItem form={form} addQues={addQues} />
                })}
            </div>
        </div>
    )
}

export default Forms;