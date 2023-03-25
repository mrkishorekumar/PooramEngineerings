import React, { memo, useState } from 'react'


function Login() {

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
        <h3 className='my-3'>Login</h3>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input required onChange={(e) => setFormData((prev) => ({...prev, email : e.target.value}))} name='email' placeholder='Email' type="email" className="form-control" id="email" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input required onChange={(e) => setFormData((prev) => ({...prev, password : e.target.value}))} name='password' placeholder='Password' type="password" className="form-control" id="password" />
      </div>
      <button type="submit" className="btn btn-dark">Login</button>
    </form>
  )
}

export default memo(Login)