import React, { memo, useState, useReducer } from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import { toastSettings } from '../Utils/toast'
import { INITIAL_STATE, reducerFunction } from '../Utils/reducer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {

  const navigate = useNavigate()

  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE)

  const [formData, setFormData] = useState<{
    email : string,
    password : string
  }>({email : "", password : ""})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: "FETCH_START" })
    axios.post(`${import.meta.env.VITE_SERVER_KEY}/auth/login`, formData)
    .then((res) => {
      if(res.status === 200){
        dispatch({ type: "FETCH_SUCCESS" })
        toast.success('Login Successfully!', toastSettings)
        Cookies.set('jwtKey', res.data.data.token, { expires: 31 })
        navigate('/invoicelist', { replace: true })
      }
    })
    .catch((err) => {
      dispatch({ type: "FETCH_ERROR" })
      toast.error(err.response.data.error, toastSettings)
    })
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
      <button type="submit" className="btn btn-dark">{state.loading ? "Loading..." : "Login"}</button>
    </form>
  )
}

export default memo(Login)