import { checkAuth } from "_Constants"

export default function checkAuthentication(setUser,setIsAuthenticationDone) {
    fetch( checkAuth , {
      credentials: 'include'
    })
    .then(res => {
      if(res.ok){
        return res.json()
      }
    })
    .then(res => {
      if(res){
        setUser(res)
      }
      setIsAuthenticationDone(true)
    })
    .catch(console.log)
}