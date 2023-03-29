import React, { memo, useState, useReducer, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastSettings } from '../Utils/toast'
import { INITIAL_STATE, reducerFunction } from '../Utils/reducer'
import { IPagination } from '../Interface/Pagination'
import LoadingScreen from '../Components/LoadingScreen';
import DeleteInvoice from '../Components/DeleteInvoice';


export interface IInvoiceList {
    "_id": string,
    "to": {
        "_id": string,
        "name": string
    },
    "total": number,
    "invoiceNo": number,
    "createdAt": string
}

interface IResponses {
    count: number,
    invoices: IInvoiceList[]
}

function InvoiceList() {

    const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE)

    const [page, setPage] = useState<IPagination>({
        currentPage: 1,
        totalData: 0
    })

    const [deleteInfo, setDeleteInfo] = useState<IInvoiceList>({
        "_id": "",
        "to": {
            "_id": "",
            "name": ""
        },
        "total": 0,
        "invoiceNo": 0,
        "createdAt": ""
    })

    const [formData, setFormData] = useState({
        companyName: "",
        invoiceNumber: "",
        dateFilter: ""
    })

    const [invoiceList, setInvoiceList] = useState<undefined | Array<IInvoiceList>>(undefined)

    function fetchData() {
        dispatch({ type: "FETCH_START" })
        axios.get(`${import.meta.env.VITE_SERVER_KEY}/invoice/list?page=${page.currentPage}&name=${formData.companyName}&invoiceNo=${formData.invoiceNumber}&createdAt=${formData.dateFilter}`, { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
            .then((res) => {
                dispatch({ type: "FETCH_SUCCESS" })
                const data: IResponses = res.data.data
                setPage((prev) => ({
                    ...prev,
                    totalData: Number(data.count)
                }))
                setInvoiceList(data.invoices)
            })
            .catch((err) => {
                dispatch({ type: "FETCH_ERROR" })
                toast.error(err.response.data.error, toastSettings)
                console.log(err)
            })
    }


    useEffect(() => {
        fetchData()
    }, [page.currentPage])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        fetchData()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "dateFilter"){
            setFormData((prev) => ({ ...prev, dateFilter : new Date(e.target.value).toISOString() }))
        }
        else {
            setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }

    if (invoiceList === undefined) {
        return <LoadingScreen />
    }

    function printInvoice(id : string){
        const win: Window = window;
        win.location = `${import.meta.env.VITE_SERVER_KEY}/invoice/pdf/${id}`
    }

    return (
        <Fragment>
            <section className='mx-auto my-5 w-75 d-flex flex-column'>
                <h1 className='mb-3'>Invoice List</h1>
                <p className='mb-4'>Filters</p>
                <form className='d-flex gap-3 mb-4' onSubmit={handleSubmit}>
                    <input name='companyName' onChange={handleChange} value={formData.companyName} placeholder='Company Name' type="text" className="form-control" />
                    <input name='invoiceNumber' onChange={handleChange} value={formData.invoiceNumber} placeholder='Invoice Number' type="number" className="form-control" />
                    <input name='dateFilter' onChange={handleChange}  placeholder='Date Filter' type="date" className="form-control" />
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
                        {
                            invoiceList.map((val) => {
                                return (
                                    <tr key={val._id}>
                                        <th scope="row">{val.invoiceNo}</th>
                                        <td>{new Date(val.createdAt).toLocaleDateString()}</td>
                                        <td>{val.to.name}</td>
                                        <td>{val.total.toFixed(2)}</td>
                                        <td onClick={() => printInvoice(val._id)}>🖨️</td>
                                        <td><Link to={`/updateinvoice/${val._id}`}>📝</Link></td>
                                        <td onClick={() => setDeleteInfo(val)} data-bs-toggle="modal" data-bs-target="#deleteinvoice">🗑️</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <PaginationControl
                    page={page.currentPage}
                    between={4}
                    total={page.totalData}
                    limit={20}
                    changePage={(page) => {
                        setPage((prev) => ({ ...prev, currentPage: page }));
                    }}
                    ellipsis={1}
                />
            </section>
            <DeleteInvoice fetchData={fetchData} deleteInfo={deleteInfo} />
        </Fragment>
    )
}

export default memo(InvoiceList)