import convertDate from "Utility/convertDate";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

import useSearchArticle from "Hooks/useSearchArticle";
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
      {isFocused && searchTerm?.length > 0 ? (
        <ul className="search-results">
          {searchResult.map((article) => (
            <li key={article.id} className="search-result">
              <Link to={`/shared-article/${article.id}`} className="search-result-link">
                <div className="search-result-article">
                  <h2 className="search-result-article-h2">{article.title}</h2>
                  <p className="search-result-article-p">
                    {convertDate(article.createdAt)} By {article.author}
                  </p>
                </div>
              </Link>
            </li>
          ))}
          <li className="search-result">
            <Link to={`/search?SearchTerm=${searchTerm}`} className="search-result-link">
              <div className="search-result-article">
                <h2 className="search-result-article-h2">Full text search</h2>
                <p className="search-result-article-p">
                  Search for <strong>{searchTerm}</strong> globally.
                </p>
              </div>
            </Link>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
