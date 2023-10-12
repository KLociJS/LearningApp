import { getArticleById } from "_Constants/fetchUrl";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useGetArticle() {
  const { id } = useParams();

  const [markdown, setMarkdown] = useState();
  const [title, setTitle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${getArticleById}${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then(({ data }) => {
        setMarkdown(data.markdown);
        setTitle(data.title);
        setIsLoading(false);
      })
      .catch(console.log);
  }, [id]);

  return {
    markdown,
    setMarkdown,
    title,
    isLoading
  };
}
