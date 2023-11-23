import "./ArticleTags.css";

export default function ArticleTags({ tags }) {
  return (
    <div className="article-card-tags-container">
      {tags.map((tag) => (
        <div key={tag} className="article-card-tag">
          {tag}
        </div>
      ))}
    </div>
  );
}
