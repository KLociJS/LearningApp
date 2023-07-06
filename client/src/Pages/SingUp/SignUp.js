import React, { useState } from 'react'

import InputField from '../../Components/Input'

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
  const [isPasswordMatch, setIsPasswordMatch] = useState(true)

  const [error, setError] = useState([])

  const handleSingup = () =>{

    let passwordMatching = password===passwordConfirmation
    if(!passwordMatching) setIsPasswordMatch(false)
  
    let userNameValidState = userNameValidator(userName)
    setIsUserNameValid(userNameValidState)

    let emailValidState = emailValidator(email)
    setIsEmailValid(emailValidState)

    let passwordValidState = passwordValidator(password)
    console.log(passwordValidState);
    setIsPasswordValid(passwordValidState)

    if(!passwordMatching || !userNameValidState || !emailValidState || !passwordValidState) return

    const newUser = {
      userName,
      email,
      password
    }

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
          const errorMessages = errorData.map(e=>e.description)
          setError(errorMessages)
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

          {/* User name input */}
          <InputField
            label='User name' 
            type='text' 
            inputValue={userName} 
            setInputValue={setUserName} 
            setIsValid={setIsUserNameValid}
            setError={setError}
            className={isUserNameValid ? '' : 'error'}
          />
          {!isUserNameValid && <p className='error-msg align-start'>User name must be between 4-20 characters.</p>}

          {/* Email input */}
          <InputField
            label='Email' 
            type='email' 
            inputValue={email} 
            setInputValue={setEmail} 
            setIsValid={setIsEmailValid} 
            setError={setError}
            className={isEmailValid ? '' : 'error'}
          />
          {!isEmailValid && <p className='error-msg align-start'>Provided email adress is invalid.</p>}

          {/* Password input */}
          <InputField
            label='Password' 
            type='password' 
            inputValue={password} 
            setInputValue={setPassword} 
            setIsValid={setIsPasswordValid} 
            setIsPasswordMatch={setIsPasswordMatch}
            setError={setError}
            className={isPasswordValid && isPasswordMatch ? '' : 'error'}
          />

          {/* Verify password input */}
          <InputField
            label='Verify password' 
            type='password' 
            inputValue={passwordConfirmation} 
            setInputValue={setPasswordConfirmation} 
            setIsPasswordMatch={setIsPasswordMatch} 
            setIsValid={setIsPasswordValid} 
            setError={setError}
            className={isPasswordValid && isPasswordMatch ? '' : 'error'}/>
          {!isPasswordValid && <p className='error-msg align-start'>Password has to be at least 6 characters long. Containing 1 letter 1 number 1 special character.</p>}
          {!isPasswordMatch && isPasswordValid && <p className='error-msg align-start'>Passwords doesnt match.</p>}
          {error.map(error=>(<p key={error} className='error-msg align-start'>{error}</p>))}
          <button className='primary-button mt-2' onClick={handleSingup}>SignUp</button>
        </div>
      </main>
    </>
  )
}

