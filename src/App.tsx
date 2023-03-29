import { Fragment, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './Utils/ProtectedRoute'
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


  const router = [
    {
      path: "/",
      protected: false,
      page: <Login />
    },
    {
      path: "/create",
      protected: true,
      page: <Signup />
    },
    {
      path: "/createinvoice",
      protected: true,
      page: <CreateInvoice flag={false} />
    },
    {
      path: "/updateinvoice/:id",
      protected: true,
      page: <CreateInvoice flag={false} />
    },
    {
      path: "/addcompany",
      protected: true,
      page: <AddCompany />
    },
    {
      path: "/dummyinvoice",
      protected: true,
      page: <DummyInvoice />
    },
    {
      path: "/invoicelist",
      protected: true,
      page: <InvoiceList />
    },
    {
      path: "/detailedcontingent",
      protected: true,
      page: <DetailedContingent />
    },
    {
      path: "/updatedetailedcontingent/:id",
      protected: true,
      page: <DetailedContingent />
    },
    {
      path: "/detailedcontingentlist",
      protected: true,
      page: <DetailedContingentList />
    },
    {
      path: "/companylist",
      protected: true,
      page: <CompanyList />
    }
  ]

  return (
    <Fragment>
      <Navbar/>
      <Routes>
        {
          router.map((val, index) => {
            return (
              (val.protected) ?
                <Route key={index} path={val.path} element={
                  <ProtectedRoute>
                    {val.page}
                  </ProtectedRoute>
                } /> :
                <Route key={index} path={val.path} element={val.page} />
            )
          })
        }
      </Routes>
    </Fragment>
  )
}

export default memo(App)