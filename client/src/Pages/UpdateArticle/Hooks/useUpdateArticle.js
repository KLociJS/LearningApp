import { useArticle } from "Hooks";
import { updateArticleUrl } from "_Constants/fetchUrl";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function useUpdateArticle(title, markdown, setShow) {
  const [newTitle, setNewTitle] = useState(title);
  const [titleError, setTitleError] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const { dispatch } = useArticle();

  const { id } = useParams();
  const navigate = useNavigate();

  const updateArticle = () => {
    setIsDisabled(true);

    if (newTitle === "") {
      setTitleError("Title is required");
      setIsDisabled(false);
      return;
    }

    const article = {
      title: newTitle,
      markdown
    };

    fetch(`${updateArticleUrl}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(article)
    })
      .then((res) => res.json())
      .then(() => {
        setIsDisabled(false);
        setShow(false);
        dispatch({ type: "update_markdown", payload: markdown });
        navigate(`/article/${id}`);
      })
      .catch((err) => {
        setIsDisabled(false);
        console.log(err);
      });
  };

  return {
    updateArticle,
    newTitle,
    setNewTitle,
    isDisabled,
    titleError,
    setTitleError
  };
}
