import { useEffect, useState } from 'react'
import Input from '../Input'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

export default function PasswordInputWithValidation({ inputValue, setInputValue, error, setError, isDisabled }) {
    const [showPassword, setShowPassword] = useState(false)

    useEffect(()=>{
        setError('')
    },[inputValue,setError])
    
  return (
    <>
        <div className='password-input'>
            <Input 
                type={showPassword ? 'text' : 'password'}
                inputValue={inputValue}
                setInputValue={setInputValue}
                hasError={error}
                label='Password'
                isDisabled={isDisabled}
            />
            {showPassword ? 
                <AiOutlineEye 
                className='password-icon'
                onClick={()=>setShowPassword(false)}
                /> :
                <AiOutlineEyeInvisible
                className='password-icon'
                onClick={()=>setShowPassword(true)}
                />
            }
        </div>
    </>
  )
}
