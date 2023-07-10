import React, { useState } from 'react'

import { Input } from 'Components'
import { AuthCard } from 'Components'

import { FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function ResetPassword() {

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleResetPassword = () => {

  }

  return (
    <>
    <main className='container card-container'>
      <AuthCard icon={FiLock} heading="Reset Password" onSubmit={handleResetPassword}>
        <Input label='Email address' type='email' inputValue={email} setInputValue={setEmail} setError={setError}/>
        {error && <p>{error}</p>}
        <Link to='/login' className='link align-end'>Back to login</Link>
        <button className='primary-button mt-2' type='submit'>Send request</button>
      </AuthCard>
    </main>
  </>
  )
}
