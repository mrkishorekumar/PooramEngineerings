import { memo, useState, useEffect, useReducer } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { INITIAL_STATE, reducerFunction } from '../Utils/reducer'
import { toast } from 'react-toastify';
import { toastSettings } from '../Utils/toast'
import { useParams } from 'react-router-dom'
import DetailedContingentTable from '../Components/DetailedContingentTable'
import FromAddress from '../Components/FromAddress'
import ToAddress from '../Components/ToAddress'
import { ICompanyList } from '../Pages/CompanyList'
import { Root } from '../Interface/UpdateDC';


export interface DetailedContingentItems {
  itemNo : string,
  name : string,
  quantity : number,
  _id?: string
}

function DetailedContingent() {

  const { id } = useParams()

  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE)

  const [to, setTo] = useState<string>("")

  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    gst: ""
  })

  const [companyList, setCompanyList] = useState<undefined | Array<ICompanyList> | string>(undefined)


  function clearData(){
    setTo("")
    setItems([{
      itemNo : "",
      name : "",
      quantity : 0
    }])
  }

  function createDc(){
    axios.get(`${import.meta.env.VITE_SERVER_KEY}/company/list`, { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
      .then((res) => {
        const response: ICompanyList[] = res.data.data.companies
        setCompanyList(response)
      })
      .catch((err) => {
        console.log(err)
      }) 
  }

  function updateDc(){
    axios.get(`${import.meta.env.VITE_SERVER_KEY}/dc/${id}`, { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
    .then((res) => {
      let response: Root = res.data.data.dc
      setTo(response.to._id)
      setItems(response.items)
      setCompanyDetails({
        name: response.to.name,
        gst: response.to.gstin
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    if (id) {
      // update dc
      updateDc()
    }
    else {
      // create dc
      setTo("")
      setItems([{
        itemNo : "",
        name : "",
        quantity : 0
      }])
      createDc()
    }
  }, [])

  const [items, setItems] = useState<Array<DetailedContingentItems>>([{
    itemNo : "",
    name : "",
    quantity : 0
  }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(id){
      // update
      dispatch({ type: "FETCH_START" })
        axios.put(`${import.meta.env.VITE_SERVER_KEY}/dc/update/${id}`, {to : to, items: [...items] }, { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
          .then((res) => {
            if (res.status === 200) {
              dispatch({ type: "FETCH_SUCCESS" })
              toast.success(res.data.message, toastSettings)
              setTo("")
              setItems([{
                itemNo : "",
                name : "",
                quantity : 0
              }])
            }
          })
          .catch((err) => {
            dispatch({ type: "FETCH_ERROR" })
            toast.error(err.response.data.error, toastSettings)
            console.log(err)
          })
    }
    else {
      dispatch({ type: "FETCH_START" })
        axios.post(`${import.meta.env.VITE_SERVER_KEY}/dc/create`, {to : to, items: [...items] }, { headers: { Authorization: `Bearer ${Cookies.get('jwtKey')}` } })
          .then((res) => {
            if (res.status === 200) {
              dispatch({ type: "FETCH_SUCCESS" })
              toast.success(res.data.message, toastSettings)
              clearData()
            }
          })
          .catch((err) => {
            dispatch({ type: "FETCH_ERROR" })
            toast.error(err.response.data.error, toastSettings)
            console.log(err)
          })
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mx-auto my-5 w-75 d-flex flex-column'>
      <h2 className='text-decoration-underline'>Detailed Contingent (DC)</h2>
      <div className='w-100 d-flex justify-content-between'>
        <FromAddress />
        <ToAddress setTo={setTo} companyDetails={companyDetails} companyList={companyList} id={id} />
      </div>
      <div className='w-100 my-3'>
        <DetailedContingentTable items={items} setItems={setItems} />
      </div>
      <div>
        <button type="submit" className="btn btn-primary p-3 fs-3">{id ? state.loading ? "Loading..." : "Update" : state.loading ? "Loading..." : "Save"}</button>
      </div>
    </form>
  )
}

export default memo(DetailedContingent)