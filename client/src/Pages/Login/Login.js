import React, { useContext, useState } from 'react'

import { login } from '_Constants'

import {  PasswordInput, Input, Loading } from 'Components'
import { AuthCard } from 'Components'

import { AiOutlineLogin } from 'react-icons/ai'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import AuthContext from '../../Context/AuthProvider'

// tacc/Abcd@1234

export default function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])

  const [isDisabled, setIsDisabled] = useState(false)

  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from.pathname || '/'

  const handleLogin = (e) =>{
    e.preventDefault()
    const userCredentials = {userName,password}
    setIsDisabled(true)
    fetch(`${login}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
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
      const {roles, userName } = response

      const Identity = {
        userName,
        roles,
        unAuthorized: false
      }

      setIsDisabled(false)
      setUser(Identity)
      navigate(from, {replace: true})
    })
    .catch(error=>{
      setIsDisabled(false)
      if (error instanceof Response) {
        error.json().then(errorData => {
          //const errorMessages = errorData.map(e=>e.description)
          setError(errorData.description)
        })
      } else {
        console.error('Error:', error)
      }
    })
  }

  return (
    <>
      <main className='container card-container'>
        <AuthCard icon={AiOutlineLogin} heading="Login" onSubmit={handleLogin}>
          <Input 
            label='Username'
            inputValue={userName}
            setInputValue={setUserName}
            isDisabled={isDisabled}
          />
          <PasswordInput 
            inputValue={password}
            setInputValue={setPassword}
            isDisabled={isDisabled}
          />
          {error && <p className='error-msg align-start'>{error}</p>}
          <Link to="/reset-password" className="link align-end">
            Forgot password?
          </Link>
          <button className="primary-button mt-2" type="submit" disabled={isDisabled}>
            Login
          </button>
        </AuthCard>
      </main>
    </>
  )
}
