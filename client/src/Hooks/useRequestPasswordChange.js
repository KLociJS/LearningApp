import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { passwordValidator, emailValidator } from 'Utility/ValidatorMethods'
import { resetPassword } from '_Constants'

export default function useRequestPasswordChange() {
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
            setIsDisabled(false)
        }
        const isEmailValid = emailValidator(email)
        if(!isEmailValid){
            setEmailError('Email is invalid.')
            setIsDisabled(false)
        }

        if(!isEmailValid || !isPasswordValid){
            return
        }

        const userData = {
            email,
            password,
            token
        }

        fetch( resetPassword ,{
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
                    setError(err.description)
                })
            }else{
                console.log(err)
            }
        })
    }

    return { 
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
    }
}
