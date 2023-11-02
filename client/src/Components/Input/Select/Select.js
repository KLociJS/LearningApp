import "./Select.css";

export default function Select({ error, setError, selectValue, setSelectValue, isDisabled }) {
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
        <option value="PhishingLink">Phishing link</option>
        <option value="InappropriateContent">Inappropriate content</option>
        <option value="MissInformation">Miss information</option>
        <option value="Other">Other</option>
      </select>
      {error ? <p className="error-msg">Please choose an option.</p> : null}
    </div>
  );
}
