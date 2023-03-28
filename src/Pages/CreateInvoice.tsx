import React, { memo, useState, useEffect } from 'react'
import BillTable from '../Components/BillTable'
import BillTotal from '../Components/BillTotal'
import FromAddress from '../Components/FromAddress'
import ToAddress from '../Components/ToAddress'

import { IBill, ICreateInvoice } from '../Interface/CreateInvoice'

function CreateInvoice({ flag } : { flag : boolean }) {

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
      total : Number((totalGst/100 * prev.subTotal) + prev.subTotal)
    }))
  }, [formData.subTotal, formData.cgstRate, formData.sgstRate, formData.igstRate])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(flag){
      // dummy invoice req
    }
    else {
      // create invoice req
    }
    console.log({ ...formData, items: [...items] })
  }

  return (
    <form onSubmit={handleSubmit} className='mx-auto my-5 w-75 d-flex flex-column'>
      <h2 className='text-decoration-underline'>
        {
          flag ? "Dummy Invoice" : "Create Invoice"
        }
      </h2>
      <div className='w-100 d-flex justify-content-between'>
        <FromAddress />
        <ToAddress />
      </div>
      <div className='w-100 my-3'>
        <BillTable items={items} setItems={setItems} />
      </div>
      <div className='w-100 d-flex justify-content-between'>
        <div>
          <button type="submit" className="btn btn-primary p-3 fs-3">
            {
              flag ? "Print" : "Save"
            }
          </button>
        </div>
        <BillTotal formData={formData} setFormData={setFormData} items={items} />
      </div>
    </form>
  )
}

export default memo(CreateInvoice)