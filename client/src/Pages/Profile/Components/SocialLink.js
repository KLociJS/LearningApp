import UserNameBasedRender from "Components/UserNameBasedRender/UserNameBasedRender";
import { useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineTwitter
} from "react-icons/ai";

const ICON_MAP = {
  Github: AiOutlineGithub,
  LinkedIn: AiOutlineLinkedin,
  Twitter: AiOutlineTwitter
};

function SocialLink({ name, link, placeholder, onLinkChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempLink, setTempLink] = useState(link || "");
  const Icon = ICON_MAP[name];

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    onLinkChange(name, tempLink);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempLink(link || "");
    setIsEditing(false);
  };

  return (
    <div className="social-link-container">
      <Icon className="social-input-icon" />
      {isEditing ? (
        <div className="social-input-container">
          <input
            className="social-input"
            type="text"
            value={tempLink}
            onChange={(e) => setTempLink(e.target.value)}
            placeholder={`${name} url...`}
          />
          <button className="secondary-button" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          ) : (
            <p className="social-placeholder">{placeholder}</p>
          )}
        </>
      )}
      <UserNameBasedRender>
        <AiOutlineEdit className="edit-social-link-icon" onClick={handleEditToggle} />
      </UserNameBasedRender>
    </div>
  );
}

export default SocialLink;
