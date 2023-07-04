import React, { useState } from 'react'

import InputLabel from '../../Components/Input'

import { AiOutlineLogin } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function SingUp() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () =>{
    if(password!==passwordConfirmation){
      setError('Passwords Doesnt match')
      return;
    }
  }

  return (
    <>
      <main className='container card-container'>
        <div className='card'>
          <AiOutlineLogin className='card-icon' />
          <h2 className='heading-1'>Sing up</h2>
          <InputLabel label='User name' type='text' inputValue={userName} setInputValue={setUserName} setError={setError}/>
          <InputLabel label='Password' type='password' inputValue={password} setInputValue={setPassword} setError={setError}/>
          <InputLabel label='Verify password' type='password' inputValue={passwordConfirmation} setInputValue={setPasswordConfirmation} setError={setError}/>
          {error && <p>{error}</p>}
          <button className='primary-button mt-2' onClick={handleLogin}>SignUp</button>
        </div>
      </main>
    </>
  )
}

