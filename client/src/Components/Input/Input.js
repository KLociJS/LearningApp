import React, { useState } from 'react';
import './Input.css';

const Input = ({ 
  label, 
  inputValue, 
  setInputValue,
  hasError,
  type, 
  isDisabled = false,
  setError
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)
  const handleChange = (e) => {
    if(setError) setError('')
    setInputValue(e.target.value)
  };

  const isActive = isFocused || inputValue ? 'active' : ''
  const disabled = isDisabled ? 'disabled' : ''

  return (
        <div className={`input-group ${hasError ? 'error' : ''}`}>
            <label className={`input-label ${isActive} ${disabled}`}>
                {label}
            </label>
            <input
                disabled={isDisabled}
                type={type || 'text'}
                value={inputValue}
                className="input-control"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="off"
            />
            {hasError && <p className='error-msg align-start'>{hasError}</p>}
    </div>
  );
};

export default Input
