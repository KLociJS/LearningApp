import defaultProfilePicture from "Pages/Profile/Components/ProfileData/ProfilePicutre/Default/default-profile.jpg";
import convertDate from "Utility/convertDate";
import { getProfilePicture } from "_Constants/fetchUrl";
import { Link } from "react-router-dom";
import "./ArticleAuthorData.css";

export default function ArticleAuthorData({ article }) {
  const profilePictureUrl = article.authorProfilePicture ? article.authorProfilePicture : null;

  return (
    <div className="article-card-author-container" onClick={(e) => e.stopPropagation()}>
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
  );
}
