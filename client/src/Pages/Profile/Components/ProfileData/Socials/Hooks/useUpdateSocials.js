import { profileController } from "_Constants/fetchUrl";

export default function useUpdateSocials(setSocialLinks) {
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
  return { handleSocialUpdate };
}
