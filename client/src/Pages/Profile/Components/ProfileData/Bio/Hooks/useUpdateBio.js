import { patchBio } from "_Constants/fetchUrl";
import { useState } from "react";

export default function useUpdateBio(bioText, setBioText) {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBioText, setTempBioText] = useState(bioText || "");
  const [error, setError] = useState(false);

  const handleBioChange = (value) => {
    setTempBioText(value);
    setError(false);
  };
  const toggleEditMode = () => {
    setTempBioText(bioText);
    setIsEditingBio((prev) => !prev);
  };

  const handleSaveBioChanges = () => {
    if (tempBioText.length > 200) {
      setError(true);
      return;
    }
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

  return {
    toggleEditMode,
    isEditingBio,
    tempBioText,
    handleBioChange,
    handleSaveBioChanges,
    error,
    setError
  };
}
