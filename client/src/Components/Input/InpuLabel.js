import React, { useState } from 'react';
import './InputLabel.css';

const InputLabel = ({ label, type, inputValue, setInputValue, setError }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e) => {
    setInputValue(e.target.value)
    setError('')
  };

  const labelClassName = isFocused || inputValue ? 'active' : '';

  return (
    <div className="input-group">
      <input
        type={type}
        id={label}
        value={inputValue}
        className="input-control"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete="off"
      />
      <label
        htmlFor={label}
        className={'input-label ' + labelClassName}
      >
        {label}
      </label>
    </div>
  );
};

export default InputLabel;
