import { Modal, ModalTriggerElement } from "Components";
import UserNameBasedRender from "Components/UserNameBasedRender/UserNameBasedRender";
import { getProfilePicture } from "_Constants/fetchUrl";
import { AiOutlineUpload } from "react-icons/ai";
import defaultProfilePicture from "../Default/default-profile.jpg";
import ProfileCropModalContent from "./ProfileCropModalContent";
import "./ProfilePicture.css";

export default function ProfilePicture({ profilePicture, setProfilePicture }) {
  const profilePictureUrl = profilePicture ? getProfilePicture + profilePicture : null;
  return (
    <div className="profile-pic-container">
      <img
        src={profilePictureUrl ? profilePictureUrl : defaultProfilePicture}
        alt="Profile picture"
        className="profile-picture"
      />
      <UserNameBasedRender>
        <Modal
          modalContent={<ProfileCropModalContent setProfilePicture={setProfilePicture} />}
          triggerElement={
            <ModalTriggerElement text={<AiOutlineUpload />} className="upload-profile-pic-button" />
          }
        />
      </UserNameBasedRender>
    </div>
  );
}
