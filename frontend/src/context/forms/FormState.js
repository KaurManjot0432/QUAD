import FormContext from './FormContext';
import { useState } from 'react';

const FormState = (props)=>{
    const s1 = {
        "name" : "Manjot Kaur",
        "Goal" : "Google"
    }
    const [state, setState] = useState(s1);

    const update = ()=>{
        setTimeout(() => {
            setState({
                "name" : "Simran Kaur",
                "Goal" : "Don't know"
            })
        }, 5000);
    }
    return (
        <FormContext.Provider value = {{state:state, update:update}}>
            {props.children}
        </FormContext.Provider>
    )
}

export default FormState;