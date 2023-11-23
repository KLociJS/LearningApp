import { fullTextSearch } from "_Constants/fetchUrl";
import { useEffect, useState } from "react";

export default function useFullTextSearch(searchTerm) {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${fullTextSearch}${searchTerm}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        setArticles(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [searchTerm]);

  return {
    isLoading,
    articles
  };
}
