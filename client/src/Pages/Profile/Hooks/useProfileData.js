import { getProfileData } from "_Constants/fetchUrl";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useProfileData() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [bioText, setBioText] = useState(null);
  const [userName, setUserName] = useState(null);
  const [socialLinks, setSocialLinks] = useState({
    github: null,
    linkedin: null,
    twitter: null
  });
  const [isLoading, setIsLoading] = useState(true);

  const { name } = useParams();

  useEffect(() => {
    fetch(getProfileData + name)
      .then((res) => res.json())
      .then((data) => {
        setProfilePicture(data.profilePicture);
        setBioText(data.bio);
        setUserName(data.userName);
        setSocialLinks({
          github: data.gitHubUrl,
          linkedin: data.linkedInUrl,
          twitter: data.twitterUrl
        });
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [name]);

  return {
    profilePicture,
    setProfilePicture,
    userName,
    bioText,
    setBioText,
    socialLinks,
    setSocialLinks,
    isLoading
  };
}
