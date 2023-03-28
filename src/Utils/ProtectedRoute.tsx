import { memo } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'


interface IProtectedRoute {
    children : JSX.Element
}

export const checkUser = () => {
    if (!Cookies.get('jwtKey')) {
      localStorage.removeItem("userId")
      return false
    }
    return true
  }

function ProtectedRoute({ children } : IProtectedRoute) {

    if (!checkUser()) {
        return <Navigate to="/" replace />
      }
      
  return children
}

export default memo(ProtectedRoute)