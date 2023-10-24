import { getProfileData, profileController } from "_Constants/fetchUrl";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Bio from "./Components/Bio";
import ProfilePicture from "./Components/ProfilePicture";
import Socials from "./Components/Socials";
import "./Profile.css";

export default function Profile() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [bioText, setBioText] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [userName, setUserName] = useState(null);
  const [socialLinks, setSocialLinks] = useState({
    github: null,
    linkedin: null,
    twitter: null
  });
  const [isLoading, setIsLoading] = useState(true);

  const { name } = useParams();

  const SOCIAL_URL_MAP = {
    github: "/update-github-url",
    linkedin: "/update-linkedin-url",
    twitter: "/update-twitter-url"
  };

  const updateSocialLink = (endpoint, link) => {
    return fetch(endpoint, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: link })
    }).then((res) => res.json());
  };

  const handleSocialUpdate = (platform, link) => {
    const lowerPlatform = platform.toLowerCase();
    const endpoint = `${profileController}${SOCIAL_URL_MAP[lowerPlatform]}`;

    updateSocialLink(endpoint, link)
      .then((data) => {
        setSocialLinks((prev) => ({ ...prev, [lowerPlatform]: data.url }));
      })
      .catch((error) => {
        console.error("Error updating social link:", error);
      });
  };

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

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-data-container">
        <ProfilePicture profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
        <h2 className="profile-user-name-label">{userName}</h2>
        <Bio
          bioText={bioText}
          setBioText={setBioText}
          isEditingBio={isEditingBio}
          setIsEditingBio={setIsEditingBio}
        />
        <Socials
          github={socialLinks.github}
          linkedin={socialLinks.linkedin}
          twitter={socialLinks.twitter}
          onSocialUpdate={handleSocialUpdate}
        />
      </div>
    </div>
  );
}
