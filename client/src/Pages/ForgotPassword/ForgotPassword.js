import { AuthCard, EmailInputWithValidation, PasswordInputWithValidation } from 'Components'
import { FiLock } from 'react-icons/fi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useRequestPasswordChange } from 'Hooks'

export default function ForgotPassword() {

    const [queryParams] = useSearchParams()
    const token = queryParams.get('token')

    const navigate = useNavigate()

    const { 
        handleSubmit, 
        email, 
        setEmail, 
        emailError,
        setEmailError, 
        password, 
        setPassword, 
        passwordError, 
        setPasswordError,
        isDisabled,
        error
    } = useRequestPasswordChange(token, navigate)

    return (
        
        <AuthCard icon={FiLock} heading='Reset Password' onSubmit={handleSubmit}>
            <EmailInputWithValidation 
                inputValue={email}
                setInputValue={setEmail}
                error={emailError} 
                setError={setEmailError}
                isDisabled={isDisabled}
            />
            <PasswordInputWithValidation
                inputValue={password}
                setInputValue={setPassword}
                error={passwordError}
                setError={setPasswordError}
                isDisabled={isDisabled}
            />
            {error && <p className='error-msg align start'>{error}</p>}
            <button className='primary-button' disabled={isDisabled}>
                Change password
            </button>
        </AuthCard>
    )
}
