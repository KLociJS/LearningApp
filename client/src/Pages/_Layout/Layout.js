import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import AuthContext from '../../Context/AuthProvider'

import NavBar from './NavBar/NavBar'

export default function Layout() {
  const [user,setUser] = useState({})
  return (
    <AuthContext.Provider value={{user,setUser}}>
      <NavBar />
      <Outlet />
    </AuthContext.Provider>
  )
}
