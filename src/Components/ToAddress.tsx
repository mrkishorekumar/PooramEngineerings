import React, { memo, useState } from 'react'
import { ICompanyList } from '../Pages/CompanyList'
import { ICreateInvoice } from '../Interface/CreateInvoice'

interface ICompanyDetails {
    name : string,
    gst : string
}

interface IToAddress {
    companyList : string | ICompanyList[] | undefined,
    setFormData : React.Dispatch<React.SetStateAction<ICreateInvoice>>,
    id : string | undefined,
    companyDetails : ICompanyDetails
}

function ToAddress({ companyList, setFormData, id, companyDetails } : IToAddress) {

    const [selected, setSelected] = useState("")


    const setCompany = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value)
        setFormData((prev) => ({
            ...prev,
            to : e.target[e.target.selectedIndex].id
        }))
    }

    return (
        <div>
            <h3>To</h3>
            {
                id ? <input readOnly value={companyDetails.name} required type="text" className="form-control" placeholder="Company Number" /> : 
                <select onChange={setCompany} required className="form-select" aria-label="Default select example">
                    {
                        typeof companyList === "object" && companyList.map((val) => {
                            return <option key={val._id} id={val._id} value={val.gstin}>{val.name}</option>
                        })
                    }
                </select>
            }
            <div className="input-group mt-3">
                <span className="input-group-text" id="basic-addon1">GST</span>
                <input readOnly value={id ? companyDetails.gst : selected} required type="text" className="form-control" placeholder="GST Number" />

            </div>
            <datalist id="datalistOptions">
                <option value="San Francisco" />
                <option value="New York" />
                <option value="Seattle" />
                <option value="Los Angeles" />
                <option value="Chicago" />
            </datalist>
        </div>
    )
}

export default memo(ToAddress)