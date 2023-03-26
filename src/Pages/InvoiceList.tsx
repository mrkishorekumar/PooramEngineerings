import React, { memo, useState, useReducer } from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control';

import { INITIAL_STATE, reducerFunction } from '../Utils/reducer'
import { IPagination } from '../Interface/Pagination'

function InvoiceList() {

    const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE)


    const [page, setPage] = useState<IPagination>({
        currentPage : 1,
        totalData : 30
    })

    const [formData, setFormData] = useState({
        companyName : "",
        invoiceNumber : "",
        dateFilter : ""
    })

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault()
        console.log(formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({...prev, [e.target.name] : e.target.value}))
    }

    return (
        <section className='mx-auto my-5 w-75 d-flex flex-column'>
            <h1 className='mb-3'>Invoice List</h1>
            <p className='mb-4'>Filters</p>
            <form className='d-flex gap-3 mb-4' onSubmit={handleSubmit}>
                <input name='companyName' onChange={handleChange} value={formData.companyName} placeholder='Company Name' type="text" className="form-control" />
                <input name='invoiceNumber' onChange={handleChange} value={formData.invoiceNumber} placeholder='Invoice Number' type="number" className="form-control" />
                <input name='dateFilter' onChange={handleChange} value={formData.dateFilter} placeholder='Date Filter' type="date" className="form-control" />
                <button type="submit" className="btn btn-dark">{state.loading ? "Loading..." : "Find"}</button>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Invoice Number</th>
                        <th scope="col">Create Date</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Invoice Total</th>
                        <th scope="col">Print</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">121</th>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td>Otto</td>
                        <td>12,000</td>
                        <td>🖨️</td>
                        <td>📝</td>
                        <td>🗑️</td>
                    </tr>
                    <tr>
                        <th scope="row">121</th>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td>Otto</td>
                        <td>12,000</td>
                        <td>🖨️</td>
                        <td>📝</td>
                        <td>🗑️</td>
                    </tr>
                    <tr>
                        <th scope="row">121</th>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td>Otto</td>
                        <td>12,000</td>
                        <td>🖨️</td>
                        <td>📝</td>
                        <td>🗑️</td>
                    </tr>
                </tbody>
            </table>
            <PaginationControl
                page={page.currentPage}
                between={4}
                total={250}
                limit={20}
                changePage={(page) => {
                    setPage((prev) => ({...prev, currentPage : page}));
                }}
                ellipsis={1}
            />
        </section>
    )
}

export default memo(InvoiceList)