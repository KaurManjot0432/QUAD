import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setcredentials] = useState({name:"", email:"", password:"", number:""});

    const navigate = useNavigate();

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleClick = async (e) => {
        e.preventDefault();
        let url = `http://localhost:3001/api/createUser`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_name:credentials.name, email: credentials.email, password: credentials.password, phone_number:credentials.number })
        });
        const res = await response.json();
        console.log(res);
        if(res.success){
            localStorage.setItem('token',res.authtoken);
            navigate("/");
        } else {
            alert("Invalid Credentials!","danger");
        }
    }

    return (
        <>
        <h1 className="my-2">Signup to QUAD</h1>
        <div className="container">
            <form onSubmit={handleClick}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name="name" value={credentials.name} aria-describedby="emailHelp" required placeholder="Enter name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name="email" value={credentials.email} aria-describedby="emailHelp" required placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password" value={credentials.password} minLength={5} required placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="number">Mobile Number</label>
                    <input type="password" className="form-control" id="number" onChange={onChange} name="number" value={credentials.number} minLength={10} required placeholder="Mobile Number" />
                </div>
                <button type="submit my-3" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}

export default Signup