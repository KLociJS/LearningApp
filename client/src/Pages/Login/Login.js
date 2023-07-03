import React, { useState } from 'react'

import './Login.css'
import AuthCard from '../../Components/AuthCard/AuthCard'
import InputLabel from '../../Components/Input/InpuLabel'
import Button from '../../Components/Button/Button'

import { AiOutlineLogin } from 'react-icons/ai'

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const inputs = [
    <InputLabel label='User name' inputValue={userName} setInputValue={setUserName}/>,
    <InputLabel label='Password' inputValue={password} setInputValue={setPassword}/>
  ]

  const handleLogin = () =>{

  }

  return (
    <>
      <main className='container card-container'>
        <AuthCard 
          heading='Login'
          inputs={inputs}
          icon={<AiOutlineLogin className='auth-icon'/>}
          button={<Button className='primary-button' buttonText='Login' handleClick={handleLogin}/>}
        />
      </main>
    </>
  )
}
