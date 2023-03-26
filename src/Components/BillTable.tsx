import React, { Fragment, memo } from 'react'

import { row } from '../Helper/addRow'
import { IBill } from '../Interface/CreateInvoice' 

interface IBillTable {
    items : Array<IBill>,
    setItems : React.Dispatch<React.SetStateAction<IBill[]>>
}

function BillTable({items, setItems} : IBillTable) {

    const addRow = () => {
        setItems((prev) => ([...prev, row]))
    }

    const deleteRow = () => {
        setItems((prev) => (prev.slice(0, -1)))
    }

    return (
        <Fragment>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Item No</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((val : IBill ,index : number) => {
                            return (
                                <tr key={index}>
                                    <td><input required onChange={(e) => setItems((prev) => {prev[index].itemNo = e.target.value; return [...prev]})} value={items[index].itemNo} type="number" min="0" className="form-control" placeholder="Item No" /></td>
                                    <td><input required onChange={(e) => setItems((prev) => {prev[index].name = e.target.value; return [...prev]})} value={items[index].name} type="text" className="form-control" placeholder="Item Name" /></td>
                                    <td><input required onChange={(e) => setItems((prev) => {prev[index].quantity = Number(e.target.value); prev[index].total = prev[index].quantity * prev[index].price; return [...prev]})} value={items[index].quantity} type="number" min="0" className="form-control" placeholder="Quantity" /></td>
                                    <td><input required onChange={(e) => setItems((prev) => {prev[index].price = Number(e.target.value); prev[index].total = prev[index].quantity * prev[index].price; return [...prev]})} value={items[index].price} type="number" min="0" className="form-control" placeholder="Price" /></td>
                                    <td><input required onChange={() => {}} value={items[index].total} type="number" min="0" className="form-control" placeholder="Total" /></td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>
            <div className='d-flex gap-3'>
                <button type="button" className="btn btn-success" onClick={addRow}>+ Add</button>
                {
                    items.length !== 1 && <button type="button" className="btn btn-danger" onClick={deleteRow}>- Delete</button>
                }      
            </div>
        </Fragment>
    )
}

export default memo(BillTable)