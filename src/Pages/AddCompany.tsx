import React, { memo, useState, useReducer } from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import { toastSettings } from '../Utils/toast'
import { INITIAL_STATE, reducerFunction } from '../Utils/reducer'
import axios from 'axios'


function AddCompany() {

  const [data, setData] = useState({
    name : "",
    gstin : "",
    addressLine1 : "",
    city : "",
    state : "",
    pincode : ""
  })

  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: "FETCH_START" })
    axios.post(`${import.meta.env.VITE_SERVER_KEY}/company/create`, data,  { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
    .then((res) => {
      if(res.status === 200){
        dispatch({ type: "FETCH_SUCCESS" })
        toast.success(res.data.message, toastSettings)
        setData({
          name : "",
          gstin : "",
          addressLine1 : "",
          city : "",
          state : "",
          pincode : ""
        })
      }
    })
    .catch((err) => {
      dispatch({ type: "FETCH_ERROR" })
      toast.error(err.response.data.error, toastSettings)
      console.log(err)
    })

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>  {
    setData((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  return (
    <section className='mx-auto my-5 w-75 d-flex flex-column justify-content-center text-center'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Company Name" className="form-label">Company Name</label>
          <input onChange={handleChange} value={data.name} name='name' placeholder='Company Name' type="text" className="form-control" id="Company Name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="Company GST" className="form-label">Company GST</label>
          <input onChange={handleChange} value={data.gstin} name='gstin' placeholder='Company GST' type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="Company Address" className="form-label">Company Address</label>
          <input onChange={handleChange} value={data.addressLine1} name="addressLine1" placeholder='Company Address' type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="Company City" className="form-label">Company City</label>
          <input onChange={handleChange} value={data.city} name='city' placeholder='Company City' type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="Company State" className="form-label">Company State</label>
          <input onChange={handleChange} value={data.state} name='state' placeholder='Company State' type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="Company Pincode" className="form-label">Company Pincode</label>
          <input onChange={handleChange} value={data.pincode} name='pincode' placeholder='Company Pincode' type="number" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-dark">{state.loading ? "Loading..." : "Save Company"}</button>
      </form>
    </section>
  )
}

export default memo(AddCompany)