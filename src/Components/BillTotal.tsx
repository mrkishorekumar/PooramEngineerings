import { Fragment, memo } from 'react'

function BillTotal() {
  return (
    <section className='d-flex flex-column'>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Subtotal &#8377;</span>
          <input required type="number" className="form-control" placeholder="Subtotal" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">SGST Rate: &#37;</span>
          <input required type="number" className="form-control" placeholder="SGST %" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">CGST Rate: &#37;</span>
          <input required type="number" className="form-control" placeholder="CGST %" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">IGST Rate: &#37;</span>
          <input required type="number" className="form-control" placeholder="IGST %" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Total &#8377;</span>
          <input required type="number" className="form-control" placeholder="Total Amount" />
        </div>
    </section>
  )
}

export default memo(BillTotal)