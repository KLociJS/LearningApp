import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from './NavBar/NavBar'
import useAuth from '../../Hooks/useAuth'
import validateAuthentication from '../../Utility/checkAuthentication'

export default function Layout() {

  const { setUser } = useAuth()

  useEffect(()=>{
    validateAuthentication(setUser)
  },[setUser])

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}