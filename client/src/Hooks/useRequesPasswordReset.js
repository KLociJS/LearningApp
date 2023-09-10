import { useState } from 'react'
import { emailValidator } from 'Utility/ValidatorMethods'
import { requestPasswordChange } from '_Constants'

export default function useRequesPasswordReset(navigate) {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
  
    const [isDisabled, setIsDisabled] = useState(false)
  
  
    const handleResetPassword = (e) => {
      e.preventDefault()
      setIsDisabled(true)
  
      const isEmailValid = emailValidator(email)
  
      if(!isEmailValid){
        setError('Email is incorrect.')
        return
      }
  
      fetch( requestPasswordChange ,{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ address:email })
      })
      .then(res=>{
        if(res.ok){
          return res.json()
        }else{
          throw res
        }
      })
      .then(()=>{
        setIsDisabled(false)
        navigate('/login')
      })
      .catch(err=>{
        setIsDisabled(false)
        if(err instanceof Response){
          err.json()
          .then(err=>{
            console.log(err)
              setError(err.description)
          })
        }else{
          console.log(err)
        }
      })
    }
  
    return { handleResetPassword, email, setEmail, error, setError, isDisabled }
}
