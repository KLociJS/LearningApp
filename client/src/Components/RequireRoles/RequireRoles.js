import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from 'Hooks/useAuth'

export default function RequireRoles({ allowedRoles }) {
    const { user, isAuthenticationDone } = useAuth()
    const location = useLocation()

    console.log('rr',user)

    const isAuthenticated = user!==null;

    if(!isAuthenticationDone){
        return (
            <p>Loading</p>
        )
    }

    if(!isAuthenticated){
        return (
        <Navigate to='login' state={{from: location}} replace />
        )
    }
    
    const hasRequiredRoles = user?.roles?.some(r=>allowedRoles?.includes(r))

    if(!hasRequiredRoles){
        return (
            <Navigate to='unauthorized' state={{from: location}} replace />
        )
    }
  return (
     <Outlet />
  )
}
