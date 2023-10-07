import {  PasswordInput, Input } from 'Components'
import { AuthCard } from 'Components'

import { AiOutlineLogin } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import { useLogin } from 'Hooks'

export default function Login() {
  const {
    userName,
    setUserName,
    password,
    setPassword,
    error,
    setError,
    isDisabled,
    handleLogin
  } = useLogin()

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
          <div className='card-button-group'>
            {error ? <p className='error-msg align-start'>{error}</p> : null}
            <Link to="/reset-password" className="link align-end">
              Forgot password?
            </Link>
            <button className="primary-button" type="submit" disabled={isDisabled}>
              Login
            </button>
          </div>

        </AuthCard>
      </main>
    </>
  )
}
