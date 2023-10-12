import useArticle from "Hooks/useArticle";
import { updatePublishedArticle } from "_Constants/fetchUrl";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function useUpdatePublishedArticle(setShow) {
  const { id } = useParams();
  const { state, dispatch } = useArticle();
  const [tags, setTags] = useState(state.article.tags.join(","));
  const [tagError, setTagError] = useState("");
  const [description, setDescription] = useState(state.article.description);
  const [descriptionError, setDescriptionError] = useState(false);
  const [error, setError] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  const updatePublishHandler = () => {
    if (description.length < 100 && description.length > 400) {
      setDescriptionError(true);
      return;
    }
    if (tags.length < 3) {
      setTagError("Use at least one tag.");
      return;
    }

    const updatedArticleDetails = {
      tags: tags.split(","),
      description
    };
    setIsDisabled(true);
    fetch(`${updatePublishedArticle}${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(updatedArticleDetails)
    })
      .then((res) => {
        if (res.ok) {
          res.json();
        } else {
          throw new Error();
        }
      })
      .then((res) => {
        setShow(false);
        dispatch({
          type: "update_published_article_details",
          payload: { ...updatedArticleDetails }
        });
      })
      .catch((err) => {
        setError("Server issue, try again later.");
      })
      .finally(() => setIsDisabled(false));
  };

  return {
    tags,
    setTags,
    description,
    setDescription,
    updatePublishHandler,
    descriptionError,
    setDescriptionError,
    tagError,
    setTagError,
    isDisabled,
    error
  };
}
