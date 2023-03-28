import { memo, useState } from 'react'
import DetailedContingentTable from '../Components/DetailedContingentTable'
import FromAddress from '../Components/FromAddress'
import ToAddress from '../Components/ToAddress'

export interface DetailedContingentItems {
  itemNo : number,
  name : string,
  quantity : number
}

function DetailedContingent() {

  const [to, setTo] = useState<string>("")

  const [items, setItems] = useState<Array<DetailedContingentItems>>([{
    itemNo : 0,
    name : "",
    quantity : 0
  }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ to : to, items: [...items] })
  }

  return (
    <form onSubmit={handleSubmit} className='mx-auto my-5 w-75 d-flex flex-column'>
      <h2 className='text-decoration-underline'>Detailed Contingent (DC)</h2>
      <div className='w-100 d-flex justify-content-between'>
        <FromAddress />
        <ToAddress />
      </div>
      <div className='w-100 my-3'>
        <DetailedContingentTable items={items} setItems={setItems} />
      </div>
      <div>
        <button type="submit" className="btn btn-primary p-3 fs-3">Save</button>
      </div>

    </form>
  )
}

export default memo(DetailedContingent)