import React, { memo, useState, useReducer } from 'react'
import { INITIAL_STATE, reducerFunction } from '../Utils/reducer'


function AddCompany() {

  const [data, setData] = useState({
    companyName : "",
    companyGst : "",
    companyAddress : "",
    companyCity : "",
    companyState : "",
    companyPincode : ""
  })

  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(data)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>  {
    setData((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  return (
    <section className='mx-auto my-5 w-75 d-flex flex-column justify-content-center text-center'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Company Name" className="form-label">Company Name</label>
          <input onChange={handleChange} value={data.companyName} name='companyName' placeholder='Company Name' type="text" className="form-control" id="Company Name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="Company GST" className="form-label">Company GST</label>
          <input onChange={handleChange} value={data.companyGst} name='companyGst' placeholder='Company GST' type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="Company Address" className="form-label">Company Address</label>
          <input onChange={handleChange} value={data.companyAddress} name="companyAddress" placeholder='Company Address' type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="Company City" className="form-label">Company City</label>
          <input onChange={handleChange} value={data.companyCity} name='companyCity' placeholder='Company City' type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="Company State" className="form-label">Company State</label>
          <input onChange={handleChange} value={data.companyState} name='companyState' placeholder='Company State' type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="Company Pincode" className="form-label">Company Pincode</label>
          <input onChange={handleChange} value={data.companyPincode} name='companyPincode' placeholder='Company Pincode' type="number" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-dark">{state.loading ? "Loading..." : "Save Company"}</button>
      </form>
    </section>
  )
}

export default memo(AddCompany)