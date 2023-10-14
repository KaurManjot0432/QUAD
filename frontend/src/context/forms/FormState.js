import FormContext from './FormContext';
import { useState } from 'react';

const FormState = (props)=>{
   const initialForms = [
    {
      "form_id": 5,
      "owner_id": 6,
      "title": "Zoho offcampus drive",
      "description": "testing /createForm api endpoint"
    },
    {
      "form_id": 6,
      "owner_id": 6,
      "title": "Zeta offcampus drive",
      "description": "testing /createForm api endpoint"
    },
    {
      "form_id": 7,
      "owner_id": 6,
      "title": "Zeta offcampus drive",
      "description": "testing /createForm api endpoint"
    }
  ]
  const [forms, setForms] = useState(initialForms);

   const addForm = (title, description)=>{
    const form = {
        "title" : "Testing",
        "description" : "Test ",
        "owner_id" : "6"
      }
    setForms(forms.concat(form));
  }
    const addQuestion = ()=>{

    }

    const deleteForm = ()=>{

    }
    return (
        <FormContext.Provider value = {{forms, setForms, addForm, addQuestion, deleteForm}}>
            {props.children}
        </FormContext.Provider>
    )
}

export default FormState;