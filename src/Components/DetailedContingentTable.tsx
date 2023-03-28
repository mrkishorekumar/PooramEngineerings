import { memo, Fragment } from 'react'
import { DetailedContingentItems } from '../Pages/DetailedContingent'

interface IDetailedContingentTableProps {
    items : DetailedContingentItems[],
    setItems : React.Dispatch<React.SetStateAction<DetailedContingentItems[]>>
}

function DetailedContingentTable({items , setItems} : IDetailedContingentTableProps) {

    const deleteRow = () => {
        setItems((prev) => (prev.slice(0, -1)))
    }
    
    const addRow = () => {
        setItems((prev) => ([...prev, {
            itemNo : 0,
            name : "",
            quantity : 0
          }]))
    }

    return (
        <Fragment>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Item No</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((val : DetailedContingentItems ,index : number) => {
                            return (
                                <tr key={index}>
                                    <td><input onChange={(e) => setItems((prev) => { prev[index].itemNo = Number(e.target.value); return [...prev]})} value={items[index].itemNo} min={0} type="number" className="form-control" placeholder="Item No" required /></td>
                                    <td><input onChange={(e) => setItems((prev) => { prev[index].name = e.target.value; return [...prev]})} value={items[index].name} type="text" className="form-control" placeholder="Item Name" required /></td>
                                    <td><input onChange={(e) => setItems((prev) => { prev[index].quantity = Number(e.target.value); return [...prev]})} value={items[index].quantity} min={0} type="number" className="form-control" placeholder="Quantity" required /></td>
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

export default memo(DetailedContingentTable)