import React, { useState } from 'react'

import  { 
  UserNameInputWithValidation,
  PasswordInputWithValidation,
  EmailInputWithValidation,
  AuthCard
} from 'Components'


import { AiOutlineLogin } from 'react-icons/ai'

import { 
userNameValidator,
passwordValidator,
emailValidator,
} from '../../Utility/ValidatorMethods'

import { useNavigate } from 'react-router-dom'


export default function SingUp() {
  const [userName, setUserName] = useState('')
  const [userNameError,setUserNameError] = useState('')

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [error, setError] = useState([])

  const navigate = useNavigate()

  const handleSignup = (e) =>{
    e.preventDefault()
  
    let userNameValidState = userNameValidator(userName)
    if(!userNameValidState){
      setUserNameError('User name must be between 4-20 alphanumeric characters.')
    }
 
    let emailValidState = emailValidator(email)
    if(!emailValidState){
      setEmailError('Email is invalid.')
    }

    let passwordValidState = passwordValidator(password)
    if(!passwordValidState){
      setPasswordError('Password has to be at least 6 characters long. Containing 1 letter 1 number 1 special character.')
    }

    if(!userNameValidState || !emailValidState || !passwordValidState) return

    const newUser = {
      userName,
      email,
      password
    }

    fetch('https://localhost:7120/api/Auth/Register', {
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
      navigate('/login')
    })
    .catch(error=>{
      if (error instanceof Response) {
        error.json().then(errorData => {
          if(errorData[0].type === 'UserName'){
            setUserNameError(errorData[0].description)
          }else if(errorData[0].type === 'Email'){
            setEmailError(errorData[0].description)
          } else{
            const serverError = errorData.map(e=>e.description)
            setError(serverError)
          }
        })
      } else {
        console.error('Error:', error)
      }
    })
  }

  return (
    <>
      <main className='container card-container'>
      <AuthCard icon={AiOutlineLogin} heading="Sign up" onSubmit={handleSignup}>
          <UserNameInputWithValidation
            inputValue={userName}
            setInputValue={setUserName}
            error={userNameError}
            setError={setUserNameError}
          />
          <PasswordInputWithValidation
            inputValue={password}
            setInputValue={setPassword}
            error={passwordError}
            setError={setPasswordError}
          />
          <EmailInputWithValidation 
            inputValue={email}
            setInputValue={setEmail}
            error={emailError}
            setError={setEmailError}
          />

          {error.map(error=>(<p key={error} className='error-msg align-start'>{error}</p>))}
          <button className='primary-button mt-2' type='submit'>SignUp</button>
        </AuthCard>
      </main>
    </>
  )
}

