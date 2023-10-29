import UserNameBasedRender from "Components/UserNameBasedRender/UserNameBasedRender";
import { AiOutlineEdit } from "react-icons/ai";
import useUpdateSocialLink from "../Hooks/useUpdateSocialLink";
import SocialEditLinkInput from "./SocialEditLinkInput";
import SocialLinkDisplay from "./SocialLinkDisplay";

export default function SocialLink({ name, link, placeholder, onLinkChange }) {
  const { Icon, isEditing, tempLink, handleTempLinkChange, handleEditToggle, handleSave, error } =
    useUpdateSocialLink(onLinkChange, name, link);

  return (
    <div className="social-link-container">
      <Icon className="social-input-icon" />
      {isEditing ? (
        <SocialEditLinkInput
          tempLink={tempLink}
          handleTempLinkChange={handleTempLinkChange}
          name={name}
          handleSave={handleSave}
          error={error}
        />
      ) : (
        <SocialLinkDisplay link={link} name={name} placeholder={placeholder} />
      )}
      <UserNameBasedRender>
        <AiOutlineEdit className="edit-social-link-icon" onClick={handleEditToggle} />
      </UserNameBasedRender>
    </div>
  );
}
