import useAuth from 'Hooks/useAuth'
import React from 'react'

export default function AuthBasedRender({children}) {

    const { user } = useAuth()

    if(user!==null){
        return null
    }

  return (
    <>
        {children}
    </>
  )
}
