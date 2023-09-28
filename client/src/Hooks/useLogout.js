import { logout } from '_Constants'
import { useAuth } from 'Hooks'

export default function useLogout() {
    const { setUser } = useAuth()

    const handleLogout = () => {
        fetch( logout , { credentials: 'include' })
        .then(res=>{
            if(res.ok){
                return res.json()
            }
            throw res
        })
        .then(()=>{
            setUser(null)
        })
        .catch(console.log)
    }
    
    return { handleLogout }
}
