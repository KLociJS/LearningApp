import defaultProfilePicture from "Pages/Profile/Components/ProfileData/ProfilePicutre/Default/default-profile.jpg";
import convertDate from "Utility/convertDate";
import { getProfilePicture } from "_Constants/fetchUrl";
import { Link, useNavigate } from "react-router-dom";
import "./ArticleCard.css";
import ArticleTags from "./Components/ArticleTags/ArticleTags";

export default function ArticleCard({ article }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/shared-article/${article.id}`);
  };

  const profilePictureUrl = article.authorProfilePicture ? article.authorProfilePicture : null;

  return (
    <div onClick={handleClick} className="article-card">
      <h2 className="article-card-title">{article.title}</h2>
      <p className="article-card-description">{article.description}</p>
      <ArticleTags tags={article.tags} />
      <div className="article-card-author-container">
        <img
          src={
            profilePictureUrl
              ? `${getProfilePicture}${article.authorProfilePicture}`
              : defaultProfilePicture
          }
          alt="author profile picture"
          className="article-card-profile-picture"
        />
        <div className="article-card-author-data">
          <Link to={`/profile/${article.author}`} className="author-link">
            {article.author}
          </Link>
          <p className="article-card-date" onClick={(e) => e.stopPropagation()}>
            {convertDate(article.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
