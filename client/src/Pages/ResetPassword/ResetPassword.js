import React, { useState } from 'react'

import { EmailInputWithValidation } from 'Components'
import { AuthCard } from 'Components'

import { FiLock } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { emailValidator } from 'Utility/ValidatorMethods'

export default function ResetPassword() {

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleResetPassword = (e) => {
    e.preventDefault()

    const isEmailValid = emailValidator(email)

    if(!isEmailValid){
      setError('Email is incorrect.')
      return
    }

    fetch('https://localhost:7120/api/Auth/request-password-change',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ address:email })
    })
    .then(res=>{
      if(res.ok){
        return res.json()
      }else{
        throw res
      }
    })
    .then(()=>{
      navigate('/login')
    })
    .catch(err=>{
      if(err instanceof Response){
        err.json()
        .then(err=>{
            const errors = err.map(e=>e.description)
            setError(errors.join(', '))
        })
      }else{
        console.log(err)
      }
    })
  }

  return (
    <>
    <main className='container card-container'>
      <AuthCard icon={FiLock} heading="Reset Password" onSubmit={handleResetPassword}>
        <p>Click the link received in email to reset password</p>
        <EmailInputWithValidation 
          inputValue={email} 
          setInputValue={setEmail} 
          error={error} 
          setError={setError} 
        />
        {error && <p>{error}</p>}
        <Link to='/login' className='link align-end'>Back to login</Link>
        <button className='primary-button mt-2' type='submit'>Send email</button>
      </AuthCard>
    </main>
  </>
  )
}
