import convertDate from "Utility/convertDate";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import useSearchArticle from "./Hooks/useSearchArticle";
import "./SearchBar.css";

export default function SearchBar() {
  const { searchTerm, setSearchTerm, searchResult, isFocused, setIsFocused } = useSearchArticle();

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  return (
    <div className="search-bar-group">
      <div className="search-bar-input">
        <input
          className="search-bar"
          placeholder="Search articles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />
        <AiOutlineSearch className="search-icon" />
      </div>
      {searchResult.length > 0 && isFocused ? (
        <div className="search-results">
          {searchResult.map((article) => (
            <Link
              to={`/shared-article/${article.id}`}
              key={article.id}
              className="search-result-link">
              <div className="search-result-article">
                <h2 className="search-result-article-h2">{article.title}</h2>
                <p className="search-result-article-p">
                  {convertDate(article.createdAt)} By {article.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
