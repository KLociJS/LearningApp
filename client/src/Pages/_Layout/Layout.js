import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import NavBar from './NavBar/NavBar'
import useAuth from '../../Hooks/useAuth'
import checkAuthentication from '../../Utility/checkAuthentication'

export default function Layout() {

  const { user, setUser } = useAuth()

  useEffect(()=>{
    if(!user){
      checkAuthentication(setUser)
    }
  },[setUser, user])

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}