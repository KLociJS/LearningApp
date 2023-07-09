import useAuth from 'Hooks/useAuth'
import React from 'react'

export default function RoleBasedRender({children, allowedroles }) {
    const { user } = useAuth()

    const hasAllowedRoles = user?.roles?.some(r=>allowedroles?.includes(r))

    if(!hasAllowedRoles){
        return null
    }

  return (
    <>
        {children}
    </>
  )
}
