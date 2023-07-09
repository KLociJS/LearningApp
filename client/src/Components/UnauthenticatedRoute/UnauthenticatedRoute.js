import useAuth from 'Hooks/useAuth'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function UnauthenticatedRoute() {
    const { user } = useAuth()

    if(user===null){
        return (
            <Outlet />
        )
    }

  return (
    <Navigate to='/' />
  )
}
