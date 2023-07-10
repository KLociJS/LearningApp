import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from 'Hooks/useAuth'
import Loading from 'Components/LoadingComponent/Loading';

export default function RequireRoles({ allowedRoles }) {
    const { user, isAuthenticationDone } = useAuth()
    const location = useLocation()

    const isAuthenticated = user!==null;

    if(!isAuthenticationDone){
        return (
            <Loading />
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
