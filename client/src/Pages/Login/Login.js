import React, { useState } from 'react'

import './Login.css'
import InputLabel from '../../Components/Input/InpuLabel'

import { AiOutlineLogin } from 'react-icons/ai'

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
          <h2 className='card-heading'>Login</h2>
          <InputLabel label='User name' inputValue={userName} setInputValue={setUserName}/>
          <InputLabel label='Password' inputValue={password} setInputValue={setPassword}/>  
          <button className='primary-button'>Login</button>
        </div>
      </main>
    </>
  )
}
