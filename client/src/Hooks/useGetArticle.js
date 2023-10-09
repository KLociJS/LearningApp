import { getArticleById } from "_Constants/fetchUrl";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useGetArticle() {
  const { id } = useParams();

  const [markdown, setMarkdown] = useState();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [isPublished, setIsPublished] = useState(false);
  const [description, setDescription] = useState();
  const [tags, setTags] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${getArticleById}${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(data);
        setMarkdown(data.markdown);
        setTitle(data.title);
        setAuthor(data.author);
        setCreatedAt(data.createdAt);
        setIsPublished(data.isPublished ? true : false);
        setDescription(data.description);
        setTags(data.tags);
        setCategory(data.category);
        setSubCategory(data.subCategory);
        setIsLoading(false);
      })
      .catch(console.log);
  }, [id]);

  return {
    markdown,
    setMarkdown,
    title,
    setTitle,
    createdAt,
    author,
    isLoading,
    isPublished,
    setIsPublished,
    description,
    tags,
    setTags,
    category,
    subCategory
  };
}
