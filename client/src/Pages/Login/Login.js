import React, { useContext, useState } from 'react'

import InputField from '../../Components/Input'

import { AiOutlineLogin } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import AuthContext from '../../Context/AuthProvider'

// tacc/Abcd@1234

export default function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])

  const { setUser } = useContext(AuthContext)

  const handleLogin = (e) =>{
    e.preventDefault()
    const userCredentials = {userName,password}
    console.log(userCredentials)

    fetch('https://localhost:7120/api/Auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials)
    })
    .then(response=>{
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    })
    .then(response=>{
      console.log(response)
      const user = {
        name:userName,
        roles:response.roles,
        expiration: response.expiration,
        token: response.token
      }
      console.log(user)
      setUser(user)
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
