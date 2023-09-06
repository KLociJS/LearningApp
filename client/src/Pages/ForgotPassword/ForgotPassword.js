import React, { useState } from 'react'

import { requestPasswordChange } from '_Constants'

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
    const [isDisabled,setIsDisabled] = useState(false)

    const [queryParams] = useSearchParams()
    const token = queryParams.get('token')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsDisabled(true)

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

        fetch( requestPasswordChange ,{
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
