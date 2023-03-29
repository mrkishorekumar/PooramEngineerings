import { memo } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastSettings } from '../Utils/toast'

import { IDcList } from '../Pages/DetailedContingentList'

interface IDeleteDCModel {
    fetchData : () => void,
    deleteInfo : IDcList
}

function DeleteDCModel({fetchData, deleteInfo} : IDeleteDCModel) {

    const deleteInvoice = () => {
        axios.delete(`${import.meta.env.VITE_SERVER_KEY}/dc/delete/${deleteInfo._id}`,  { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
        .then((res) => {
            if(res.status === 200){
                toast.success(res.data.message, toastSettings)
                fetchData()
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

  return (
    <div className="modal fade" id="deleteDc" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Alert</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Do you want to delete DC Invoice Number : <mark>{deleteInfo.dcNo}</mark> ?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={deleteInvoice}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default memo(DeleteDCModel)