import React, { useEffect } from 'react'
import Input from '../Input'

export default function EmailInputWithValidation({ inputValue, setInputValue, error, setError, isDisabled}) {

    useEffect(()=>{
        setError('')
    },[inputValue, setError])

    return (
        <>
            <Input
                type='email'
                label='Email'
                inputValue={inputValue}
                setInputValue={setInputValue}
                hasError={error}
                isDisabled={isDisabled}
            />
            {error && <p className='error-msg align-start'>{error}</p>}
        </>
    )
}
