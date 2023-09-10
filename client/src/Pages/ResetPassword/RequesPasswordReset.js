import { EmailInputWithValidation } from 'Components'
import { AuthCard } from 'Components'

import { FiLock } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useRequesPasswordReset } from 'Hooks'

export default function RequesPasswordReset() {

  const navigate = useNavigate()
  const { 
    handleResetPassword, 
    email, 
    setEmail, 
    error, 
    setError, 
    isDisabled 
  } = useRequesPasswordReset(navigate)

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
        <Link to='/login' className='link align-end'>Back to login</Link>
        <button className='primary-button mt-2' type='submit' disabled={isDisabled}>Send email</button>
      </AuthCard>
    </main>
  </>
  )
}
