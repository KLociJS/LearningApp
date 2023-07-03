import React, { useState } from 'react';
import './InputLabel.css';

const InputLabel = ({label, inputValue, setInputValue}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e) => setInputValue(e.target.value);

  const labelClassName = isFocused || inputValue ? 'active' : '';

  return (
    <div className="input-group">
      <input
        type="text"
        id="myInput"
        className="input-control"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <label
        htmlFor="myInput"
        className={'input-label '+labelClassName}
      >
        {label}
      </label>
    </div>
  );
};

export default InputLabel;
