import React, { useState } from 'react'

import InputLabel from '../../Components/Input'

import { AiOutlineLogin } from 'react-icons/ai'
import { Link } from 'react-router-dom';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () =>{

  }

  return (
    <>
      <main className='container card-container'>
        <div className='card'>
          <AiOutlineLogin className='card-icon' />
          <h2 className='heading-1'>Login</h2>
          <InputLabel label='User name' type='text' inputValue={userName} setInputValue={setUserName}/>
          <InputLabel label='Password' type='password' inputValue={password} setInputValue={setPassword}/>
          <Link to='/password-reset' className='link align-end mt-1'>Forgot password?</Link>
          <button className='primary-button mt-2' onClick={handleLogin}>Login</button>
        </div>
      </main>
    </>
  )
}
