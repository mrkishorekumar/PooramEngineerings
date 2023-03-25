import { memo } from 'react'
import BillTable from '../Components/BillTable'
import BillTotal from '../Components/BillTotal'
import FromAddress from '../Components/FromAddress'
import ToAddress from '../Components/ToAddress'

function DummyInvoice() {

    return (
        <section className='mx-auto my-5 w-75 d-flex flex-column'>
            <h2 className='text-decoration-underline'>DummyInvoice</h2>
            <div className='w-100 d-flex justify-content-between'>
                <FromAddress />
                <ToAddress />
            </div>
            <div className='w-100 my-3'>
                <BillTable />
            </div>
            <div className='w-100 d-flex justify-content-between'>
                <div>
                    <button type="button" className="btn btn-primary p-3 fs-3">Save</button>
                </div>
                <BillTotal />
            </div>
        </section>
    )
}

export default memo(DummyInvoice)