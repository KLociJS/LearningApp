import { useState } from "react";
import "./TextArea.css";

export default function TextArea({ label, inputValue, setInputValue }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const isActive = isFocused || inputValue ? "active" : "";

  return (
    <div className={`input-group`}>
      <label className={`input-label ${isActive}`}>{label}</label>
      <textarea
        value={inputValue}
        className="input-control input-textarea"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  );
}
