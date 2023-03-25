import { memo } from 'react'
import DetailedContingentTable from '../Components/DetailedContingentTable'
import FromAddress from '../Components/FromAddress'
import ToAddress from '../Components/ToAddress'

function DetailedContingent() {
  return (
    <section className='mx-auto my-5 w-75 d-flex flex-column'>
      <h2 className='text-decoration-underline'>Detailed Contingent (DC)</h2>
      <div className='w-100 d-flex justify-content-between'>
        <FromAddress />
        <ToAddress />
      </div>
      <div className='w-100 my-3'>
        <DetailedContingentTable />
      </div>
      <div>
        <button type="button" className="btn btn-primary p-3 fs-3">Save</button>
      </div>

    </section>
  )
}

export default memo(DetailedContingent)