import ArticleCard from "Components/Featured/Components/ArticleCard/ArticleCard";
import { useSearchParams } from "react-router-dom";
import "./FullTextSearch.css";
import useFullTextSearch from "./Hooks/useFullTextSearch";

export default function FullTextSearch() {
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("SearchTerm");

  const { isLoading, articles } = useFullTextSearch(searchTerm);
  console.log(articles);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="full-text-articles-container">
        <h1 className="full-text-result-label">
          Search results for: <strong>{searchTerm}</strong>
        </h1>
        <p className="full-text-result-details">
          Articles found: <strong>{articles.length}</strong>
        </p>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </>
  );
}
