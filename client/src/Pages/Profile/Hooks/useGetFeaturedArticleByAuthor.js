import { getFeaturedArticlesByAuthor } from "_Constants/fetchUrl";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useGetFeaturedArticleByAuthor() {
  const { name } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${getFeaturedArticlesByAuthor}${name}`, {
      headers: { "content-type": "application/json" }
    })
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
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [name]);

  return { isLoading, articles, error };
}
