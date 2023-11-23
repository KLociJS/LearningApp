import { useState } from "react";
import "./TextArea.css";

export default function TextArea({
  label,
  inputValue,
  setInputValue,
  error,
  setError,
  isDisabled,
  min = 0,
  max = Infinity
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e) => {
    if (setError) setError(false);
    setInputValue(e.target.value);
  };

  const isActive = isFocused || inputValue ? "active" : "";
  const isRightLength = inputValue.length >= min && inputValue.length <= max;

  return (
    <div className={`textarea-input-group ${error ? "error" : ""}`}>
      <label className={`textarea-input-label ${isActive} ${isDisabled ? "disabled" : ""}`}>
        {label}
      </label>
      <textarea
        value={inputValue}
        className="textarea-input-control input-textarea"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled={isDisabled}
        autoComplete="off"
      />
      <p className={`textarea-counter ${isRightLength ? "" : "error"}`}>
        {inputValue.length}/{max}
      </p>
    </div>
  );
}
