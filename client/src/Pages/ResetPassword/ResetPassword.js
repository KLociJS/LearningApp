import React, { useState } from 'react'

import { resetPassword } from '_Constants'

import { EmailInputWithValidation } from 'Components'
import { AuthCard } from 'Components'

import { FiLock } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { emailValidator } from 'Utility/ValidatorMethods'

export default function ResetPassword() {

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const [isDisabled, setIsDisabled] = useState(false)

  const navigate = useNavigate()

  const handleResetPassword = (e) => {
    e.preventDefault()
    setIsDisabled(true)

    const isEmailValid = emailValidator(email)

    if(!isEmailValid){
      setError('Email is incorrect.')
      return
    }

    fetch( resetPassword ,{
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
      setIsDisabled(false)
      navigate('/login')
    })
    .catch(err=>{
      setIsDisabled(false)
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
        <button className='primary-button mt-2' type='submit' disabled={isDisabled}>Send email</button>
      </AuthCard>
    </main>
  </>
  )
}
