export default function SocialEditLinkInput({
  tempLink,
  handleTempLinkChange,
  name,
  handleSave,
  error
}) {
  return (
    <div className="social-input-container">
      <input
        className="social-input"
        type="text"
        value={tempLink}
        onChange={handleTempLinkChange}
        placeholder={`${name} url...`}
      />
      {error ? <p className="error-msg">{error}</p> : null}
      <button className="secondary-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
