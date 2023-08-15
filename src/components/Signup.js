import React from 'react'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
  let history = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name, email, password} = credentials
    const response = await fetch("http://localhost:5000/api/auth/createuser/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password})
    });
    const json = await response.json()
    if (json.success){
        // Save the auth-token and redirect
        localStorage.setItem('token', json.authToken) // chnaged -------------------------------------------------------------------------------------------
        history("/")
        props.ShowAlert("Account created succesfully", "success")

    }
    else
    {
        props.ShowAlert("Invalid details", "danger")
    }
}

const onChange = (e)=>{
    // ----------------------------------- the following syntax is important  -------------------------------------------------------
    setCredentials({...credentials, [e.target.name]: e.target.value})
}

  return (
    <div className='container'>
      <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name = "name" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name = "email" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} name="password" id="password" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" onChange={onChange} name="cpassword" id="cpassword" minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>    </div>
  )
}

export default Signup