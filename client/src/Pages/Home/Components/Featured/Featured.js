import ArticleCard from "./Components/ArticleCard";
import ArticleCardSkeleton from "./Components/Components/ArticleCardSkeleton";
import "./Featured.css";
import useGetFeaturedArticles from "./Hooks/useGetFeaturedArticles";

export default function Featured() {
  const { articles, isLoading } = useGetFeaturedArticles();

  if (isLoading) {
    return <ArticleCardSkeleton />;
  }

  return (
    <aside className="featured">
      <h2 className="featured-label">Most recent</h2>
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} />
      ))}
    </aside>
  );
}
