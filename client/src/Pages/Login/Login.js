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

  const [isLoaded, setIsLoaded] = useState(true)

  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from.pathname || '/'

  const handleLogin = (e) =>{
    e.preventDefault()
    const userCredentials = {userName,password}

    fetch(`${login}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(userCredentials)
    })
    .then(response=>{
      setIsLoaded(false)

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

      setUser(Identity)
      setIsLoaded(true)
      navigate(from, {replace: true})
    })
    .catch(error=>{
      if (error instanceof Response) {
        error.json().then(errorData => {
          //const errorMessages = errorData.map(e=>e.description)
          setError(errorData.description)
        })
      } else {
        console.error('Error:', error)
      }
      setIsLoaded(true)
    })
  }

  if(!isLoaded){
    return <Loading />
  }


  return (
    <>
      <main className='container card-container'>
        <AuthCard icon={AiOutlineLogin} heading="Login" onSubmit={handleLogin}>
          <Input 
            label='Username'
            inputValue={userName}
            setInputValue={setUserName}
          />
          <PasswordInput 
            inputValue={password}
            setInputValue={setPassword}
          />
          {error && <p className='error-msg align-start'>{error}</p>}
          <Link to="/reset-password" className="link align-end">
            Forgot password?
          </Link>
          <button className="primary-button mt-2" type="submit">
            Login
          </button>
        </AuthCard>
      </main>
    </>
  )
}
