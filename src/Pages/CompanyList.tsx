import { memo } from 'react'

function CompanyList() {
  return (
    <section className='mx-auto my-5 w-75 d-flex flex-column'>
        <h1 className='mb-3'>Company List</h1>

        <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Company Name</th>
                        <th scope="col">GST Number</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Otto</th>
                        <td>sdlfkal</td>
                        <td>📝</td>
                    </tr>
                    <tr>
                        <th scope="row">Otto</th>
                        <td>lkadnj32</td>
                        <td>📝</td>
                    </tr>
                    <tr>
                        <th scope="row">Otto</th>
                        <td>fnejfnwue</td>
                        <td>📝</td>
                    </tr>
                </tbody>
            </table>
    </section>
  )
}

export default memo(CompanyList)