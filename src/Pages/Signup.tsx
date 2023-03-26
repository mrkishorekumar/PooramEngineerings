import React, { memo, useState, useReducer } from 'react'
import { INITIAL_STATE, reducerFunction } from '../Utils/reducer'



function Signup() {

  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE)

  const [formData, setFormData] = useState<{
    email : string,
    password : string
  }>({email : "", password : ""})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <form className='w-75 mx-auto mt-5' onSubmit={handleSubmit}>
      <div className="mb-3">
        <h3 className='my-3'>Signup</h3>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input onChange={(e) => setFormData((prev) => ({...prev, email : e.target.value}))} name='email' placeholder='Email' type="email" className="form-control" id="email" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input onChange={(e) => setFormData((prev) => ({...prev, password : e.target.value}))} name='password'  placeholder='Password' type="password" className="form-control" id="password" />
      </div>
      <button type="submit" className="btn btn-dark">{state.loading ? "Loading..." : "Signup  "}</button>
    </form>
  )
}

export default memo(Signup)