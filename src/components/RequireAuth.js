import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

const RequireAuth = ({ allowedRoles }) => {
  const user = useSelector(selectUser)
  const role = user?.role
  const location = useLocation()

  console.log('auth', { role, user }, role && allowedRoles?.includes(role))

  if (role && allowedRoles?.includes(role)) {
    return <Outlet />
  } else {
    if (user) {
      return <Navigate to='/unauthorized' state={{ from: location }} replace />
    } else {
      return <Navigate to='/login' state={{ from: location }} replace />
    }
  }
}

export default RequireAuth
