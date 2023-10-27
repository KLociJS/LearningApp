import TextArea from "Components/Input/TextArea/TextArea";
import UserNameBasedRender from "Components/UserNameBasedRender/UserNameBasedRender";
import { AiOutlineEdit } from "react-icons/ai";
import "./Bio.css";
import useUpdateBio from "./Hooks/useUpdateBio";

export default function Bio({ bioText, setBioText }) {
  const {
    toggleEditMode,
    isEditingBio,
    tempBioText,
    handleBioChange,
    handleSaveBioChanges,
    error,
    setError
  } = useUpdateBio(bioText, setBioText);

  return (
    <div className="bio-container">
      <UserNameBasedRender>
        <AiOutlineEdit className="edit-bio-icon" onClick={toggleEditMode} />
      </UserNameBasedRender>

      <h2 className="profile-data-label">Bio</h2>

      {isEditingBio ? (
        <div className="edit-bio-container">
          <TextArea
            inputValue={tempBioText}
            setInputValue={handleBioChange}
            max={200}
            error={error}
            setError={setError}
          />
          <button className="secondary-button" onClick={handleSaveBioChanges}>
            Save
          </button>
        </div>
      ) : (
        <p className="bio-text">{bioText ? bioText : `This user haven't added bio.`}</p>
      )}
    </div>
  );
}
