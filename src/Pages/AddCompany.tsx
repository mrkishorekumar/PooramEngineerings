import React from 'react'

function AddCompany() {
  return (
    <section className='mx-auto my-5 w-75 d-flex flex-column justify-content-center text-center'>
      <form>
        <div className="mb-3">
          <label htmlFor="Company Name" className="form-label">Company Name</label>
          <input placeholder='Company Name' type="text" className="form-control" id="Company Name" />
        </div>
        <div className="mb-3">
          <label htmlFor="Company GST" className="form-label">Company GST</label>
          <input placeholder='Company GST' type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="Company Address" className="form-label">Company Address</label>
          <textarea placeholder='Company Address' className="form-control" id="Company Address" rows={3}></textarea>
        </div>
        <button type="submit" className="btn btn-dark">Save Company</button>
      </form>
    </section>
  )
}

export default AddCompany