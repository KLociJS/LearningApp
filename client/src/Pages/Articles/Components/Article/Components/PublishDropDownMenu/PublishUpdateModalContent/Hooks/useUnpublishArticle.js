import { useArticle } from "Hooks";
import { unpublishArticle } from "_Constants/fetchUrl";
import { useParams } from "react-router-dom";

export default function useUnpublishArticle(setShow) {
  const { id } = useParams();
  const { dispatch } = useArticle();
  const unpublishHandler = () => {
    fetch(`${unpublishArticle}${id}`, { method: "POST", credentials: "include" })
      .then((res) => res.json())
      .then(() => {
        dispatch({ type: "unpublish_article" });
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  return {
    unpublishHandler
  };
}
