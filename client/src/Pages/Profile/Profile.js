import Featured from "Components/Featured/Featured";
import ProfileData from "./Components/ProfileData/ProfileData";
import useGetFeaturedArticleByAuthor from "./Hooks/useGetFeaturedArticleByAuthor";
import "./Profile.css";

export default function Profile() {
  const { isLoading, articles, error } = useGetFeaturedArticleByAuthor();
  return (
    <div className="profile-container">
      <ProfileData />
      <Featured isLoading={isLoading} articles={articles} />
    </div>
  );
}
