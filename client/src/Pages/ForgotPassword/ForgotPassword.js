import React, { useState } from 'react'
import { AuthCard, EmailInputWithValidation, PasswordInputWithValidation } from 'Components'
import { FiLock } from 'react-icons/fi'
import { emailValidator, passwordValidator } from 'Utility/ValidatorMethods'
import { useNavigate, useSearchParams } from 'react-router-dom'


export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [emailError,setEmailError] = useState('')

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [error,setError] = useState('')

    const [queryParams] = useSearchParams()
    const token = queryParams.get('token')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const isPasswordValid = passwordValidator(password)
        if(!isPasswordValid){
            setPasswordError('Password has to be at least 6 characters long. Containing 1 letter 1 number 1 special character.')
        }
        const isEmailValid = emailValidator(email)
        if(!isEmailValid){
            setEmailError('Email is invalid.')
        }

        if(!isEmailValid || !isPasswordValid){
            return
        }

        const userData = {
            email,
            password,
            token
        }

        fetch('https://localhost:7120/api/Auth/reset-password',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res=>{
            if(res.ok){
                return res.json()
            }
            throw res
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
        
        <AuthCard icon={FiLock} heading='Reset Password' onSubmit={handleSubmit}>
            <EmailInputWithValidation 
                inputValue={email}
                setInputValue={setEmail}
                error={emailError} 
                setError={setEmailError}
            />
            <PasswordInputWithValidation
                inputValue={password}
                setInputValue={setPassword}
                error={passwordError}
                setError={setPasswordError}
            />
            {error && <p className='error-msg align start'>{error}</p>}
            <button className='primary-button'>
                Change password
            </button>
        </AuthCard>
    )
}
