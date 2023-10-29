import useProfileData from "Pages/Profile/Hooks/useProfileData";
import Bio from "./Bio/Bio";
import ProfileDataSkeleton from "./ProfileDataSkeleton/ProfileDataSkeleton";
import ProfilePicture from "./ProfilePicutre/ProfilePicture";
import Socials from "./Socials/Socials";

export default function ProfileData() {
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
    return <ProfileDataSkeleton />;
  }
  return (
    <div className="profile-data-container">
      <div className="profile-pic-wrapper">
        <ProfilePicture profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
        <h2 className="profile-user-name-label">{userName}</h2>
      </div>
      <Bio bioText={bioText} setBioText={setBioText} />
      <Socials
        github={socialLinks.github}
        linkedin={socialLinks.linkedin}
        twitter={socialLinks.twitter}
        setSocialLinks={setSocialLinks}
      />
    </div>
  );
}
