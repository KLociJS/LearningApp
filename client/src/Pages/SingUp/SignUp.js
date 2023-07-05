import React, { useState } from 'react'

import InputLabel from '../../Components/Input'

import { AiOutlineLogin } from 'react-icons/ai'

import { 
userNameValidator,
passwordValidator,
emailValidator,
} from '../../Utility/ValidatorMethods'

export default function SingUp() {
  const [userName, setUserName] = useState('')
  const [isUserNameValid, setIsUserNameValid] = useState(true)

  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [isPasswordValid,setIsPasswordValid] = useState(true)

  const [error, setError] = useState('')

  const handleLogin = () =>{

    let passwordMatching = password===passwordConfirmation
    if(!passwordMatching) setError('Passwords Doesnt match')
  
    let userNameValidState = userNameValidator(userName)
    setIsUserNameValid(userNameValidState)

    let emailValidState = emailValidator(email)
    setIsEmailValid(emailValidState)

    let passwordValidState = passwordValidator(password)
    setIsPasswordValid(passwordValidState)

    if(!passwordMatching || !userNameValidState || !emailValidState || !passwordValidState) return

    const newUser = {
      userName,
      email,
      password
    }

    console.log(newUser);

    fetch('https://localhost:7120/api/Auth', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser)
    })
    .then(response=>{
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    })
    .then(res=>{
      console.log(res)
    })
    .catch(error=>{
      if (error instanceof Response) {
        error.json().then(errorData => {
          console.log(errorData)
          setError(errorData.message)
        })
      } else {
        console.error('Error:', error)
      }
    })
  }

  return (
    <>
      <main className='container card-container'>
        <div className='card'>
          <AiOutlineLogin className='card-icon' />
          <h2 className='heading-1'>Sing up</h2>
          <InputLabel
            label='User name' 
            type='text' 
            inputValue={userName} 
            setInputValue={setUserName} 
            setIsValid={setIsUserNameValid} 
            className={isUserNameValid ? '' : 'error'}
          />
          {!isUserNameValid && <p className='error-msg align-start'>Must be 4-20 characters.</p>}
          {!isUserNameValid && <p className='error-msg align-start'>[ a-z, A-Z, 0-9, .-_ ]</p>}
          <InputLabel 
            label='Email' 
            type='email' 
            inputValue={email} 
            setInputValue={setEmail} 
            setIsValid={setIsEmailValid} 
            className={isEmailValid ? '' : 'error'}
          />
          {!isEmailValid && <p className='error-msg align-start'>Email is invalid</p>}
          <InputLabel 
            label='Password' 
            type='password' 
            inputValue={password} 
            setInputValue={setPassword} 
            setIsValid={setIsPasswordValid} 
            setError={setError} 
            className={!isPasswordValid || error ? 'error' : ''}/>
          <InputLabel 
            label='Verify password' 
            type='password' 
            inputValue={passwordConfirmation} 
            setInputValue={setPasswordConfirmation} 
            setError={setError} 
            setIsValid={setIsPasswordValid} 
            className={!isPasswordValid || error ? 'error' : ''}/>
          {!isPasswordValid && <p className='error-msg align-start'>Must be at least 6 characters long</p>}
          {!isPasswordValid && <p className='error-msg align-start'>Contain at least one of each character</p>}
          {!isPasswordValid && <p className='error-msg align-start'>[ A-Z, a-z, 0-9, special character ]</p>}

          {error && isPasswordValid && <p className='error-msg align-start'>{error}</p>}
          <button className='primary-button mt-2' onClick={handleLogin}>SignUp</button>
        </div>
      </main>
    </>
  )
}

