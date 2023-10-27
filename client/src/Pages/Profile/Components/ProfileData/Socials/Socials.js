import { SocialLinkContext } from "Pages/Profile/Context/useSocialLinkContext";
import {
  githubValidator,
  linkedInValidator,
  twitterValidator
} from "Pages/Profile/Utility/socialUrlValidator";
import SocialLink from "./Components/SocialLink";
import useUpdateSocials from "./Hooks/useUpdateSocials";
import "./Socials.css";

export default function Socials({ github, linkedin, twitter, setSocialLinks }) {
  const { handleSocialUpdate } = useUpdateSocials(setSocialLinks);

  return (
    <div className="socials-container">
      <h2 className="profile-data-label center">Socials</h2>
      <SocialLinkContext.Provider value={{ validator: githubValidator }}>
        <SocialLink
          name="Github"
          link={github}
          placeholder="No Github added"
          onLinkChange={handleSocialUpdate}
        />
      </SocialLinkContext.Provider>
      <SocialLinkContext.Provider value={{ validator: linkedInValidator }}>
        <SocialLink
          name="LinkedIn"
          link={linkedin}
          placeholder="No LinkedIn added"
          onLinkChange={handleSocialUpdate}
        />
      </SocialLinkContext.Provider>
      <SocialLinkContext.Provider value={{ validator: twitterValidator }}>
        <SocialLink
          name="Twitter"
          link={twitter}
          placeholder="No Twitter added"
          onLinkChange={handleSocialUpdate}
        />
      </SocialLinkContext.Provider>
    </div>
  );
}
