import React, { memo, useState, useReducer, useEffect, Fragment } from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastSettings } from '../Utils/toast'
import LoadingScreen from '../Components/LoadingScreen';

import { INITIAL_STATE, reducerFunction } from '../Utils/reducer'
import { IPagination } from '../Interface/Pagination'
import DeleteDCModel from '../Components/DeleteDCModel';


export interface IDcList {
    "_id": string,
    "to": {
        "_id": string,
        "name": string
    },
    "dcNo": number,
    "createdAt": string
}


 interface IDetailedContingentListResponse {
    "dcs": IDcList[],
    "count": number
}


function DetailedContingentList() {

    const [dcList, setDcList] = useState<undefined | Array<IDcList>>(undefined)

    const fetchData = () => {
        dispatch({ type: "FETCH_START" })
        axios.get(`${import.meta.env.VITE_SERVER_KEY}/dc/list?page=${page.currentPage}&name=${formData.companyName}&dcNo=${formData.invoiceNumber}&createdAt=${formData.dateFilter}`, { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
            .then((res) => {
                const data: IDetailedContingentListResponse = res.data.data
                dispatch({ type: "FETCH_SUCCESS" })
                setDcList(data.dcs)
                setPage((prev) => ({
                    ...prev,
                    totalData: data.count
                }))
            })
            .catch((err) => {
                dispatch({ type: "FETCH_ERROR" })
                toast.error(err.response.data.error, toastSettings)
                console.log(err)
            })
    }

    const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE)

    const [page, setPage] = useState<IPagination>({
        currentPage: 1,
        totalData: 30
    })

    const [deleteInfo, setDeleteInfo] = useState<IDcList>({
        "_id": "",
        "to": {
            "_id": "",
            "name": ""
        },
        "dcNo": 0,
        "createdAt": ""
    })

    const [formData, setFormData] = useState({
        companyName: "",
        invoiceNumber: "",
        dateFilter: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        fetchData()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        fetchData()
    }, [page.currentPage])

    if (dcList === undefined) {
        return <LoadingScreen />
    }

    function printDc(id : string){
        const win: Window = window;
        win.location = `${import.meta.env.VITE_SERVER_KEY}/dc/pdf/${id}`
    }

    return (
        <Fragment>
            <section className='mx-auto my-5 w-75 d-flex flex-column'>
                <h1 className='mb-3'>Detailed Contingent (DC) List</h1>
                <p className='mb-4'>Filters</p>
                <form className='d-flex gap-3 mb-4' onSubmit={handleSubmit}>
                    <input name='companyName' onChange={handleChange} value={formData.companyName} placeholder='Company Name' type="text" className="form-control" />
                    <input name='invoiceNumber' onChange={handleChange} value={formData.invoiceNumber} placeholder='DC Number' type="number" className="form-control" />
                    <input name='dateFilter' onChange={handleChange} value={formData.dateFilter} placeholder='Date Filter' type="date" className="form-control" />
                    <button type="submit" className="btn btn-dark">{state.loading ? "Loading..." : "Find"}</button>
                </form>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Invoice Number</th>
                            <th scope="col">Create Date</th>
                            <th scope="col">Company Name</th>
                            <th scope="col">Print</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dcList.map((val) => {
                                return (
                                    <tr key={val._id}>
                                        <th scope="row">{val.dcNo}</th>
                                        <td>{new Date(val.createdAt).toLocaleDateString()}</td>
                                        <td>{val.to.name}</td>
                                        <td onClick={() => printDc(val._id)}>🖨️</td>
                                        <td><Link to={`/updatedetailedcontingent/${val._id}`}>📝</Link></td>
                                        <td data-bs-toggle="modal" data-bs-target="#deleteDc" onClick={() => setDeleteInfo(val)}>🗑️</td>
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
            <DeleteDCModel fetchData={fetchData} deleteInfo={deleteInfo} />
        </Fragment>
    )
}

export default memo(DetailedContingentList)