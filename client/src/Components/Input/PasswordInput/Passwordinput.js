import { useState } from 'react'
import Input from '../Input'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

export default function PasswordInput({ inputValue, setInputValue}) {
    const [showPassword, setShowPassword] = useState(false)
    
  return (
    <>
        <div className='password-input'>
            <Input 
                type={showPassword ? 'text' : 'password'}
                inputValue={inputValue}
                setInputValue={setInputValue}
                label='Password'
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
