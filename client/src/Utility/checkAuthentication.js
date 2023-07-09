import { useNavigate } from "react-router-dom"

export default function checkAuthentication(setUser) {
    fetch('https://localhost:7120/api/Auth/check-authentication', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if(!res.unAuthorized){
        setUser(res)
      }
    })
    .catch(console.log)
}