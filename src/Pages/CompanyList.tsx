import { Fragment, memo, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import CompanyUpadateModel from '../Components/CompanyUpadateModel'

function CompanyList() {

    const [list, setList] = useState<undefined | Array<any>>(undefined)

    const [data, setData] = useState({})

    const fetchDetails = () => {
        axios.get(`${import.meta.env.VITE_SERVER_KEY}/company/list?name=`, { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
            .then((res) => {
                setList(res.data.data.companies)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchDetails()
    }, [])

    if (list === undefined) {
        return <h1>Loading</h1>
    }

    return (
        <Fragment>
            <section className='mx-auto my-5 w-75 d-flex flex-column'>
            <h1 className='mb-3'>Company List</h1>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Company Name</th>
                        <th scope="col">Company City</th>
                        <th scope="col">Company Pincode</th>
                        <th scope="col">GST Number</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((val) => {
                            return (
                                <tr key={val._id}>
                                    <th scope="row">{val.name}</th>
                                    <td>{val.city}</td>
                                    <td>{val.pincode}</td>
                                    <td>{val.gstin}</td>
                                    <td onClick={() => setData(val)} data-bs-toggle="modal" data-bs-target="#CompanyUpadateModel">📝</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </section>
        <CompanyUpadateModel fetchDetails={fetchDetails} data={data} setData={setData} />
        </Fragment>
    )
}

export default memo(CompanyList)