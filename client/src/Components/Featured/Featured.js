import ArticleCard from "./Components/ArticleCard";
import ArticleCardSkeleton from "./Components/Components/ArticleCardSkeleton";
import "./Featured.css";

export default function Featured({ articles, isLoading }) {
  if (isLoading) {
    return <ArticleCardSkeleton />;
  }

  return (
    <aside className="featured">
      <h2 className="featured-label">Featured articles</h2>
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} />
      ))}
    </aside>
  );
}