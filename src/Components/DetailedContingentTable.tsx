import { memo, Fragment } from 'react'

function DetailedContingentTable() {
    return (
        <Fragment>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Select</th>
                        <th scope="col">Item No</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"><input type="checkbox" className="form-check-input" /></th>
                        <td><input type="number" className="form-control" placeholder="Item No" /></td>
                        <td><input type="text" className="form-control" placeholder="Item Name" /></td>
                        <td><input type="number" className="form-control" placeholder="Quantity" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><input type="checkbox" className="form-check-input" /></th>
                        <td><input type="number" className="form-control" placeholder="Item No" /></td>
                        <td><input type="text" className="form-control" placeholder="Item Name" /></td>
                        <td><input type="number" className="form-control" placeholder="Quantity" /></td>
                    </tr>
                    <tr>
                        <th scope="row"><input type="checkbox" className="form-check-input" /></th>
                        <td><input type="number" className="form-control" placeholder="Item No" /></td>
                        <td><input type="text" className="form-control" placeholder="Item Name" /></td>
                        <td><input type="number" className="form-control" placeholder="Quantity" /></td>
                    </tr>
                </tbody>
            </table>
            <div className='d-flex gap-3'>
                <button type="button" className="btn btn-success">+ Add</button>
                <button type="button" className="btn btn-danger">- Delete</button>
            </div>
        </Fragment>
    )
}

export default memo(DetailedContingentTable)