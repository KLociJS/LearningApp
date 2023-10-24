import UserNameBasedRender from "Components/UserNameBasedRender/UserNameBasedRender";
import { patchBio } from "_Constants/fetchUrl";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import "./Bio.css";

export default function Bio({ bioText, setBioText, isEditingBio, setIsEditingBio }) {
  const [tempBioText, setTempBioText] = useState(bioText || "");

  const handleBioChange = (e) => {
    setTempBioText(e.target.value);
  };
  const toggleEditMode = () => {
    setTempBioText(bioText);
    setIsEditingBio((prev) => !prev);
  };

  const handleSaveBioChanges = () => {
    fetch(patchBio, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ bioContent: tempBioText })
    })
      .then((res) => res.json())
      .then((data) => {
        setBioText(tempBioText);
        setIsEditingBio(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bio-container">
      <UserNameBasedRender>
        <AiOutlineEdit className="edit-bio-icon" onClick={toggleEditMode} />
      </UserNameBasedRender>
      <h2 className="profile-data-label">Bio</h2>
      {isEditingBio ? (
        <div className="edit-bio-container">
          <textarea value={tempBioText} onChange={handleBioChange} className="bio-textarea" />
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
