import { createContext, useContext } from "react";

export const SocialLinkContext = createContext();

export default function useSocialLinkContext() {
  return useContext(SocialLinkContext);
}
