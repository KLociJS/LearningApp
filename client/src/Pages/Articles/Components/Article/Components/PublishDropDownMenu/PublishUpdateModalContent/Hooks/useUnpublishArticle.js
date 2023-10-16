import useArticleContext from "Hooks/useArticle";
import { unpublishArticle } from "_Constants/fetchUrl";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function useUnpublishArticle(setShow) {
  const { id } = useParams();
  const { dispatch } = useArticleContext();
  const [fetchError, setFetchError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const unpublishHandler = () => {
    setFetchError(false);
    setIsDisabled(true);
    fetch(`${unpublishArticle}${id}`, { method: "POST", credentials: "include" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(() => {
        dispatch({ type: "unpublish_article" });
        setShow(false);
      })
      .catch((err) => {
        setFetchError(true);
        console.log(err);
      })
      .finally(() => setIsDisabled(false));
  };

  return {
    unpublishHandler,
    fetchError,
    isDisabled
  };
}
