import convertDate from "Utility/convertDate";
import { Link, useNavigate } from "react-router-dom";
import "./ArticleCard.css";

export default function ArticleCard({ article }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/shared-article/${article.id}`);
  };
  return (
    <div onClick={handleClick} className="article-card">
      <h2 className="article-card-title">{article.title}</h2>
      <p className="article-card-description">{article.description}</p>
      <p className="article-card-footer" onClick={(e) => e.stopPropagation()}>
        {convertDate(article.createdAt)} By{" "}
        <Link to={`profile/${article.author}`} className="author-link">
          {article.author}
        </Link>
      </p>
    </div>
  );
}
