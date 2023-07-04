import React, { useState } from 'react'

import './Login.css'
import InputLabel from '../../Components/Input/InpuLabel'

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
          <InputLabel label='User name' inputValue={userName} setInputValue={setUserName}/>
          <InputLabel label='Password' inputValue={password} setInputValue={setPassword}/>
          <Link to='/password-reset' className='link align-end mt-1'>Forgot password?</Link>
          <button className='primary-button mt-2' onClick={handleLogin}>Login</button>
        </div>
      </main>
    </>
  )
}
