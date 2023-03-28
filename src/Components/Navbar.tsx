import { memo } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

export function logout() {
  Cookies.remove("jwtKey")
  window.location.href = '/';
}

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Tenth navbar example">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/detailedcontingent">Create DC</Link>
            </li>
            <li className="nav-item">
              <Link to="/createinvoice" className="nav-link active">Create Invoice</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/dummyinvoice">Create Dummy Invoice</Link>
            </li>
            <li className="nav-item">
              <Link to="/addcompany" className="nav-link active">Create Company</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/detailedcontingentlist">DC List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/invoicelist">Invoice List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/companylist">Company List</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link active" onClick={logout}>Logout</a>
            </li>

            <li className="nav-item">
              <Link to="/" className="nav-link active">Login</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default memo(Navbar)