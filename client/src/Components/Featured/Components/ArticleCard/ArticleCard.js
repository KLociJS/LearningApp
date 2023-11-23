import ArticleAuthorData from "Components/ArticleAuthorData/ArticleAuthorData";
import { useNavigate } from "react-router-dom";
import "./ArticleCard.css";
import ArticleTags from "./Components/ArticleTags/ArticleTags";

export default function ArticleCard({ article }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/shared-article/${article.id}`);
  };

  return (
    <div onClick={handleClick} className="article-card">
      <h2 className="article-card-title">{article.title}</h2>
      <p className="article-card-description">{article.description}</p>
      <ArticleTags tags={article.tags} />
      <ArticleAuthorData article={article} />
    </div>
  );
}
