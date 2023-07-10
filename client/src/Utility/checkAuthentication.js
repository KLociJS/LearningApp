export default function checkAuthentication(setUser,setIsAuthenticationDone) {
    fetch('https://localhost:7120/api/Auth/check-authentication', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(!res.unAuthorized){
        setUser(res)
      }
      setIsAuthenticationDone(true)
    })
    .catch(console.log)
}