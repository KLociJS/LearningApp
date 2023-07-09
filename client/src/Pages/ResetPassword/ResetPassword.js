import React, { useState } from 'react'

import { InputField } from 'Components'

import { FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function ResetPassword() {

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {

  }

  return (
    <>
    <main className='container card-container'>
      <div className='card'>
        <FiLock className='card-icon mb-1' />
        <h2 className='heading-2'>Reset Password</h2>
        <InputField label='Email address' type='email' inputValue={email} setInputValue={setEmail} setError={setError}/>
        {error && <p>{error}</p>}
        <Link to='/login' className='link align-end'>Back to login</Link>
        <button className='primary-button mt-2' onClick={handleLogin}>Send request</button>
      </div>
    </main>
  </>
  )
}
