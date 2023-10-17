import { Modal, ModalTriggerElement } from "Components";
import { AiOutlineUpload } from "react-icons/ai";
import defaultProfilePicture from "../Default/default-profile.jpg";
import ProfileCropModalContent from "./ProfileCropModalContent";
import "./ProfilePicture.css";

export default function ProfilePicture({ picture }) {
  return (
    <div className="profile-pic-container">
      <img
        src={picture ? picture : defaultProfilePicture}
        alt="Profile picture"
        className="profile-picture"
      />
      <Modal
        modalContent={<ProfileCropModalContent />}
        triggerElement={
          <ModalTriggerElement text={<AiOutlineUpload />} className="upload-profile-pic-button" />
        }
      />
    </div>
  );
}
