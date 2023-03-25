import { Fragment, memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './Components/Navbar'
import AddCompany from './Pages/AddCompany'
import CompanyList from './Pages/CompanyList'
import CreateInvoice from './Pages/CreateInvoice'
import DetailedContingent from './Pages/DetailedContingent'
import DetailedContingentList from './Pages/DetailedContingentList'
import DummyInvoice from './Pages/DummyInvoice'
import InvoiceList from './Pages/InvoiceList'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/create' element={<Signup />} /> 
        <Route path='/createinvoice' element={<CreateInvoice />} />
        <Route path='/addcompany' element={<AddCompany />} />
        <Route path='/dummyinvoice' element={<DummyInvoice />} />
        <Route path='/invoicelist' element={<InvoiceList />} />
        <Route path='/invoicelist/:id' element={<InvoiceList />} />
        <Route path='/detailedcontingent' element={<DetailedContingent />} />
        <Route path='/detailedcontingentlist' element={<DetailedContingentList />} />
        <Route path='/companylist' element={<CompanyList />} />
      </Routes>
    </Fragment>
  )
}

export default memo(App)