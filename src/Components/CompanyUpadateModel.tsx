import React, { memo } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import { toastSettings } from '../Utils/toast'

import { ICompanyList } from '../Pages/CompanyList'

interface ICompanyUpadateModel {
    data : ICompanyList,
    setData : React.Dispatch<React.SetStateAction<ICompanyList>>,
    fetchDetails : () => void
}

function CompanyUpadateModel({data, setData, fetchDetails} : ICompanyUpadateModel) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev : ICompanyList) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        axios.put(`${import.meta.env.VITE_SERVER_KEY}/company/update/${data._id}`, data,  { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
        .then((res) => {
            if(res.status === 200){
                toast.success(res.data.message, toastSettings)
                fetchDetails()
            }
        })
        .catch((err) => {
            toast.error(err.response.data.error, toastSettings)
            console.log(err)
        })

    }

    return (
        <div className="modal fade" id="CompanyUpadateModel" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form className="modal-content" onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Update Company</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
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
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-warning" data-bs-dismiss="modal">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(CompanyUpadateModel)