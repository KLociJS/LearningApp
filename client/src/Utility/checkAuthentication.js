
export default function validateAuthentication(setUser) {
    
    fetch('https://localhost:7120/api/Auth/check-authentication', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(!res.unAuthorized){
        setUser(res)
      }
    })
    .catch(console.log)
}