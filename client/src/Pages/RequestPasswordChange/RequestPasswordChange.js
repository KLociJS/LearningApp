import { AuthCard, EmailInputWithValidation, PasswordInputWithValidation } from 'Components'
import { FiLock } from 'react-icons/fi'
import { useRequestPasswordChange } from 'Hooks'

export default function RequestPasswordChange() {
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
    } = useRequestPasswordChange()

    return (
        
        <AuthCard icon={FiLock} heading='Change password' onSubmit={handleSubmit}>
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
            <button className='primary-button mt-1' disabled={isDisabled}>
                Change password
            </button>
        </AuthCard>
    )
}
