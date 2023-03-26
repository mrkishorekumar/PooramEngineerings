import React, { memo, useState } from 'react'
import BillTable from '../Components/BillTable'
import BillTotal from '../Components/BillTotal'
import FromAddress from '../Components/FromAddress'
import ToAddress from '../Components/ToAddress'

import { IBill, ICreateInvoice } from '../Interface/CreateInvoice'

function CreateInvoice() {

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
    to : "",
    subTotal: 0,
    sgstRate: 0,
    cgstRate: 0,
    igstRate: 0,
    total: 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({...formData, items : [...items]})
  }

  return (
    <form onSubmit={handleSubmit} className='mx-auto my-5 w-75 d-flex flex-column'>
      <div className='w-100 d-flex justify-content-between'>
        <FromAddress />
        <ToAddress />
      </div>
      <div className='w-100 my-3'>
        <BillTable items={items} setItems={setItems} />
      </div>
      <div className='w-100 d-flex justify-content-between'>
        <div>
          <button type="submit" className="btn btn-primary p-3 fs-3">Save</button>
        </div>
        <BillTotal />
      </div>
    </form>
  )
}

export default memo(CreateInvoice)