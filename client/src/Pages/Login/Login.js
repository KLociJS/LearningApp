import React, { useState } from 'react'

import InputField from '../../Components/Input'

import { AiOutlineLogin } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])

  const handleLogin = () =>{

  }

  return (
    <>
      <main className='container card-container'>
        <form className='card'>
          <AiOutlineLogin className='card-icon' />
          <h2 className='heading-1'>Login</h2>
          <InputField label='User name' type='text' inputValue={userName} setInputValue={setUserName} setError={setError}/>
          <InputField label='Password' type='password' inputValue={password} setInputValue={setPassword} setError={setError}/>
          <Link to='/reset-password' className='link align-end'>Forgot password?</Link>
          <button className='primary-button mt-2' onClick={handleLogin}>Login</button>
        </form>
      </main>
    </>
  )
}
