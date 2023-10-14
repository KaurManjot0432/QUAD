import React, {useContext} from 'react';
import FormContext from '../context/forms/FormContext';
import FormItem from './FormItem';

const Forms = () => {
    const context = useContext(FormContext);
    const {forms, setForms} = context;
    return (
        <div>
             <div className="container my-3">
                <h1>Your Forms</h1>
                {forms.map((form)=>{
                    return <FormItem form={form} />
                })}
                </div>
        </div>
    )
}

export default Forms;