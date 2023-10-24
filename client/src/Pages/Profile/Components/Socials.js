import SocialLink from "./SocialLink";
import "./Socials.css";

function Socials({ github, linkedin, twitter, onSocialUpdate }) {
  return (
    <div className="socials-container">
      <h2 className="profile-data-label center">Socials</h2>
      <SocialLink
        name="Github"
        link={github}
        placeholder="No Github added"
        onLinkChange={onSocialUpdate}
      />
      <SocialLink
        name="LinkedIn"
        link={linkedin}
        placeholder="No LinkedIn added"
        onLinkChange={onSocialUpdate}
      />
      <SocialLink
        name="Twitter"
        link={twitter}
        placeholder="No Twitter added"
        onLinkChange={onSocialUpdate}
      />
    </div>
  );
}

export default Socials;
