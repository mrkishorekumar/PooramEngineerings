import { memo, useEffect } from 'react'

import { ICreateInvoice, IBill } from '../Interface/CreateInvoice'


interface IBillTotal {
  formData : ICreateInvoice,
  setFormData : React.Dispatch<React.SetStateAction<ICreateInvoice>>
  items : Array<IBill>
}

function BillTotal({ formData, setFormData, items } : IBillTotal ) {

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      subTotal : items.reduce((total, value) => {
        return total + value.total
      },0)
    }))
  },[items])

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      total : Number(((prev.cgstRate + prev.igstRate + prev.sgstRate)/100 * (prev.cgstRate + prev.igstRate + prev.sgstRate) + formData.subTotal).toFixed(2))
    }))
  },[formData.sgstRate, formData.igstRate, formData.cgstRate, formData.subTotal])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name] : Number(e.target.value)
    }))
  }

  return (
    <section className='d-flex flex-column'>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Subtotal &#8377;</span>
          <input readOnly value={formData.subTotal} name="subTotal" onChange={handleChange} required type="number" className="form-control" placeholder="Subtotal" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">SGST Rate: &#37;</span>
          <input value={formData.sgstRate} name="sgstRate" onChange={handleChange} required type="number" className="form-control" placeholder="SGST %" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">CGST Rate: &#37;</span>
          <input value={formData.cgstRate} name="cgstRate" onChange={handleChange} required type="number" className="form-control" placeholder="CGST %" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">IGST Rate: &#37;</span>
          <input value={formData.igstRate} name="igstRate" onChange={handleChange} required type="number" className="form-control" placeholder="IGST %" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Total &#8377;</span>
          <input readOnly value={formData.total} name="total" required type="number" className="form-control" placeholder="Total Amount" />
        </div>
    </section>
  )
}

export default memo(BillTotal)