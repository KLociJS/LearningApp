import useArticle from "Hooks/useArticle";
import { updatePublishedArticle } from "_Constants/fetchUrl";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function useUpdatePublishedArticle(setShow) {
  const { id } = useParams();
  const { state, dispatch } = useArticle();
  const [tags, setTags] = useState(state.article.tags.join(","));
  const [description, setDescription] = useState(state.article.description);

  const updatePublishHandler = () => {
    const updatedArticleDetails = {
      tags: tags.split(","),
      description
    };
    fetch(`${updatePublishedArticle}${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(updatedArticleDetails)
    })
      .then((res) => res.json())
      .then((res) => {
        setShow(false);
        dispatch({
          type: "update_published_article_details",
          payload: { ...updatedArticleDetails }
        });
      })
      .catch((err) => console.log(err));
  };

  return {
    tags,
    setTags,
    description,
    setDescription,
    updatePublishHandler
  };
}
