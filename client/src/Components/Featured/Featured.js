import ArticleCard from "./Components/ArticleCard";
import ArticleCardSkeleton from "./Components/Components/ArticleCardSkeleton";
import "./Featured.css";

export default function Featured({ articles, isLoading }) {
  if (isLoading) {
    return <ArticleCardSkeleton />;
  }

  return (
    <aside className="featured">
      <h2 className="featured-label">Featured</h2>
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} />
      ))}
      {articles.length === 0 ? (
        <h2 className="no-available-articles">No featured articles available.</h2>
      ) : null}
    </aside>
  );
}
