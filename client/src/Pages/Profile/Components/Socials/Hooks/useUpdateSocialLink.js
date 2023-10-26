import { useState } from "react";
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineTwitter } from "react-icons/ai";
import useSocialLinkContext from "../../../Context/useSocialLinkContext";

const ICON_MAP = {
  Github: AiOutlineGithub,
  LinkedIn: AiOutlineLinkedin,
  Twitter: AiOutlineTwitter
};

export default function useUpdateSocialLink(onLinkChange, name, link) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempLink, setTempLink] = useState(link || "");
  const [error, setError] = useState("");

  const { validator } = useSocialLinkContext();

  const Icon = ICON_MAP[name];

  const handleEditToggle = () => {
    setTempLink(link);
    setError("");
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const isTempLinkValid = validator(tempLink);
    if (!isTempLinkValid) {
      setError("Invalid Link.");
      return;
    }
    onLinkChange(name, tempLink, setError);
    setIsEditing(false);
  };
  const handleTempLinkChange = (e) => {
    setTempLink(e.target.value);
    setError("");
  };

  return {
    Icon,
    isEditing,
    error,
    tempLink,
    handleTempLinkChange,
    handleEditToggle,
    handleSave
  };
}
