import "./Select.css";

export default function Select({
  error,
  setError,
  selectValue,
  setSelectValue,
  isDisabled,
  options
}) {
  const handleChange = (e) => {
    setSelectValue(e.target.value);
    setError(false);
  };

  return (
    <div>
      <select
        disabled={isDisabled}
        value={selectValue}
        onChange={handleChange}
        className={`select-input ${error ? "error" : ""}`}>
        <option value=""> --Choose an option-- </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {error ? <p className="error-msg">Please choose an option.</p> : null}
    </div>
  );
}

[
  { value: "PhishingLink", text: "Phishing link" },
  { value: "InappropriateContent", text: "Inappropriate content" },
  { value: "MissInformation", text: "Miss information" },
  { value: "Other", text: "Other" }
];
