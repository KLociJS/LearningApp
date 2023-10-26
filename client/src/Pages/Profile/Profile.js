import Bio from "./Components/Bio/Bio";
import ProfilePicture from "./Components/ProfilePicutre/ProfilePicture";
import Socials from "./Components/Socials/Socials";
import useProfileData from "./Hooks/useProfileData";
import "./Profile.css";

export default function Profile() {
  const {
    profilePicture,
    setProfilePicture,
    userName,
    bioText,
    setBioText,
    socialLinks,
    setSocialLinks,
    isLoading
  } = useProfileData();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-data-container">
        <ProfilePicture profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
        <h2 className="profile-user-name-label">{userName}</h2>
        <Bio bioText={bioText} setBioText={setBioText} />
        <Socials
          github={socialLinks.github}
          linkedin={socialLinks.linkedin}
          twitter={socialLinks.twitter}
          setSocialLinks={setSocialLinks}
        />
      </div>
    </div>
  );
}
