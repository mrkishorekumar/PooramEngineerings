import React, { memo, useState, useEffect, useReducer } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastSettings } from '../Utils/toast'
import { INITIAL_STATE, reducerFunction } from '../Utils/reducer'
import BillTable from '../Components/BillTable'
import BillTotal from '../Components/BillTotal'
import FromAddress from '../Components/FromAddress'
import ToAddress from '../Components/ToAddress'

import { Root } from '../Interface/UpdateInvoice'
import { IBill, ICreateInvoice } from '../Interface/CreateInvoice'
import { ICompanyList } from '../Pages/CompanyList'
import LoadingScreen from '../Components/LoadingScreen';
import { useParams } from 'react-router-dom';

function CreateInvoice({ flag }: { flag: boolean }) {

  const { id } = useParams()

  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    gst: ""
  })

  const [items, setItems] = useState<Array<IBill>>([
    {
      itemNo: "",
      name: "",
      quantity: 0,
      price: 0,
      total: 0
    }
  ])

  const [formData, setFormData] = useState<ICreateInvoice>({
    to: "",
    subTotal: 0,
    sgstRate: 0,
    cgstRate: 0,
    igstRate: 0,
    total: 0
  })

  const [companyList, setCompanyList] = useState<undefined | Array<ICompanyList> | string>(undefined)

  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE)

  function createInvoice() {
    setFormData({
      to: "",
      subTotal: 0,
      sgstRate: 0,
      cgstRate: 0,
      igstRate: 0,
      total: 0
    })
    setCompanyDetails({
      name: "",
      gst: ""
    })
    setItems([
      {
        itemNo: "",
        name: "",
        quantity: 0,
        price: 0,
        total: 0
      }
    ])
    axios.get(`${import.meta.env.VITE_SERVER_KEY}/company/list`, { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
      .then((res) => {
        const response: ICompanyList[] = res.data.data.companies
        setCompanyList(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function updateInvoice() {
    axios.get(`${import.meta.env.VITE_SERVER_KEY}/invoice/${id}`, { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
      .then((res) => {
        let response: Root = res.data.data.invoice
        setFormData({
          to: response.to._id,
          subTotal: response.subTotal,
          sgstRate: response.sgstRate,
          cgstRate: response.cgstRate,
          igstRate: response.igstRate,
          total: response.total
        })
        setCompanyDetails({
          name: response.to.name,
          gst: response.to.gstin
        })
        setItems(response.items)
        setCompanyList("update")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (id) {
      updateInvoice()
    }
    else {
      createInvoice()
    }
  }, [])

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      subTotal: items.reduce((total, currentValue) => {
        return total + currentValue.total
      }, 0)
    }))
  }, [items])

  useEffect(() => {
    let totalGst = Number(formData.cgstRate) + Number(formData.sgstRate) + Number(formData.igstRate)
    setFormData((prev) => ({
      ...prev,
      total: Number((totalGst / 100 * prev.subTotal) + prev.subTotal)
    }))
  }, [formData.subTotal, formData.cgstRate, formData.sgstRate, formData.igstRate])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (flag) {
      // dummy invoice req
    }
    else {
      // create invoice req
      if (id) {
        dispatch({ type: "FETCH_START" })
        axios.put(`${import.meta.env.VITE_SERVER_KEY}/invoice/update/${id}`, { ...formData, items: [...items] }, { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
          .then((res) => {
            if (res.status === 200) {
              dispatch({ type: "FETCH_SUCCESS" })
              toast.success(res.data.message, toastSettings)
              setFormData({
                to: "",
                subTotal: 0,
                sgstRate: 0,
                cgstRate: 0,
                igstRate: 0,
                total: 0
              })
              setCompanyDetails({
                name: "",
                gst: ""
              })
              setItems([
                {
                  itemNo: "",
                  name: "",
                  quantity: 0,
                  price: 0,
                  total: 0
                }
              ])
            }
          })
          .catch((err) => {
            dispatch({ type: "FETCH_ERROR" })
            toast.error(err.response.data.error, toastSettings)
            console.log(err)
          })
      }
      else {
        dispatch({ type: "FETCH_START" })
        axios.post(`${import.meta.env.VITE_SERVER_KEY}/invoice/create`, { ...formData, items: [...items] }, { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
          .then((res) => {
            if (res.status === 200) {
              dispatch({ type: "FETCH_SUCCESS" })
              toast.success(res.data.message, toastSettings)
            }
          })
          .catch((err) => {
            dispatch({ type: "FETCH_ERROR" })
            toast.error(err.response.data.error, toastSettings)
            console.log(err)
          })
      }

    }
  }

  if (companyList === undefined) {
    return <LoadingScreen />
  }

  return (
    <form onSubmit={handleSubmit} className='mx-auto my-5 w-75 d-flex flex-column'>
      <h2 className='text-decoration-underline'>
        {
          flag ? "Dummy Invoice" : id ? "Update Invoice" : "Create Invoice"
        }
      </h2>
      <div className='w-100 d-flex justify-content-between'>
        <FromAddress />
        <ToAddress companyDetails={companyDetails} id={id} setFormData={setFormData} companyList={companyList} />
      </div>
      <div className='w-100 my-3'>
        <BillTable items={items} setItems={setItems} />
      </div>
      <div className='w-100 d-flex justify-content-between'>
        <div>
          <button type="submit" className="btn btn-primary p-3 fs-3">
            {
              flag ? "Print" : state.loading ? "Loading..." : id ? "Update" : "Save"
            }
          </button>
        </div>
        <BillTotal formData={formData} setFormData={setFormData} items={items} />
      </div>
    </form>
  )
}

export default memo(CreateInvoice)