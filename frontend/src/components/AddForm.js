import React, { useContext, useState } from 'react'
import FormContext from '../context/forms/FormContext'

export const AddForm = () => {
    const context = useContext(FormContext);
    const {addForm} = context;
    const [form, setForm] = useState({title:"", description:""});
    const onChange = (e)=>{
        setForm({...form,[e.target.name]: e.target.value});
    }
    const HandleClick = (e)=>{
        e.preventDefault();
        addForm(form.title, form.description);
        setForm({title: "", description: ""})
    }
    return (
        <div className="container">
            <h4>Create a Form</h4>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" id="title" onChange={onChange} value={form.title} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={onChange} name="description" id="description" value={form.description}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={HandleClick}>Create</button>
            </form>
            </div>
    )
}