import FormContext from './FormContext';
import { useState } from 'react';

const FormState = (props) => {
  const host = 'http://localhost:3001';
  const initialForms = [];
  const [forms, setForms] = useState(initialForms);
  const initialFormQuestions = [];
  const [formQuestions, setFormQuestions]= useState(initialFormQuestions);

  const getForms = async () => {
    let url = `${host}/api/forms`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyN30sImlhdCI6MTY5NzI3NzcwOX0.KflOa1giPnVlcjrqPXFMDnT56316Q6wSk_2Uhika7RY'
      }
    });
    const res = await response.json();
    setForms(res);
  }

  const addForm = async (title, description) => {
    let url = `${host}/api/createForm`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyN30sImlhdCI6MTY5NzI3NzcwOX0.KflOa1giPnVlcjrqPXFMDnT56316Q6wSk_2Uhika7RY'
      },
      body: JSON.stringify({ title, description })
    });
    const res = await response.json();
    setForms(forms.concat(res));
  }
  const addQuestion = async(form_id, question_type, question_text) => {
    let url = `${host}/api/saveFormQuestion`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyN30sImlhdCI6MTY5NzI3NzcwOX0.KflOa1giPnVlcjrqPXFMDnT56316Q6wSk_2Uhika7RY'
      },
      body: JSON.stringify({ form_id, question_type, question_text })
    });
    const res = await response.json();
    console.log(res);
  }

  const findFormQuestions = async (form_id) => {
    let url = `${host}/api/formQuestions?form_id=${form_id}`;
    const response = await fetch(url, {
      method: 'GET',
    });
    const res = await response.json();
    console.log(res);
    setFormQuestions(res);
  }

  const saveFormRespone = async (form_id, answers) => {
    let url = `${host}/api/saveFormResponse`;
    const questions = [
        {
          question_id: parseInt(answers.question_id), // Convert to integer if necessary
          answer_text: answers.answer_text
        }
      ];
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyN30sImlhdCI6MTY5NzI3NzcwOX0.KflOa1giPnVlcjrqPXFMDnT56316Q6wSk_2Uhika7RY'
      },
      body: JSON.stringify({ form_id, questions })
    });
    const res = await response.json();
    console.log(res);
    setFormQuestions(res);
  }

  const deleteForm = () => {

  }

  return (
    <FormContext.Provider value={{ forms, setForms, getForms, addForm, addQuestion, 
    deleteForm, findFormQuestions, formQuestions, setFormQuestions, saveFormRespone }}>
      {props.children}
    </FormContext.Provider>
  )
}

export default FormState;