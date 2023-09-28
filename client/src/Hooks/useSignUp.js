import { useState } from 'react'

import { register } from '_Constants'

import { 
userNameValidator,
passwordValidator,
emailValidator,
} from 'Utility/ValidatorMethods'

import { useNavigate } from 'react-router-dom'

export default function useSignUp() {
    const [userName, setUserName] = useState('')
    const [userNameError,setUserNameError] = useState('')
  
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
  
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
  
    const [isDisabled, setIsDisabled] = useState(false)
  
    const [error, setError] = useState('')
  
    const navigate = useNavigate()
  
    const handleSignup = (e) =>{
      e.preventDefault()
  
      setUserNameError('')
      setEmailError('')
      setPasswordError('')
      setError('')
      setIsDisabled(true)
    
      let userNameValidState = userNameValidator(userName)
      if(!userNameValidState){
        setUserNameError('User name must be between 4-20 alphanumeric characters.')
        setIsDisabled(false)
      }
   
      let emailValidState = emailValidator(email)
      if(!emailValidState){
        setEmailError('Email is invalid.')
        setIsDisabled(false)
      }
  
      let passwordValidState = passwordValidator(password)
      if(!passwordValidState){
        setPasswordError('Password has to be at least 6 characters long. Containing 1 letter 1 number 1 special character.')
        setIsDisabled(false)
      }
  
      if(!userNameValidState || !emailValidState || !passwordValidState) return
  
      const newUser = {
        userName,
        email,
        password
      }
  
      fetch( register , {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
      })
      .then(response=>{
        console.log('response: ', response)
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(()=>{
        setIsDisabled(false)
        navigate('/login')
      })
      .catch(error=>{
        setIsDisabled(false)
        if (error instanceof Response) {
          error.json().then(errorData => {
            console.log(errorData);
            if(errorData.errorType === 'UserName'){
              setUserNameError(errorData.description)
            }else if(errorData.errorType === 'Email'){
              console.log("emailerror");
              setEmailError(errorData.description)
            } else{
              console.log("servererror");
              setError(errorData.description)
            }
          })
        } else {
          console.error('Error:', error)
        }
      })
    }

    return {
        userName,
        setUserName,
        userNameError,
        setUserNameError,
        email,
        setEmail,
        emailError,
        setEmailError,
        password,
        setPassword,
        passwordError,
        setPasswordError,
        isDisabled,
        error,
        setError,
        handleSignup
    }
}
