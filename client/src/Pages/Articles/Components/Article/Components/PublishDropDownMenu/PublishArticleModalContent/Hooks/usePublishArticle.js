import useArticleContext from "Hooks/useArticle";
import { publishArticle } from "_Constants/fetchUrl";
import { useReducer } from "react";
import { useParams } from "react-router-dom";

const publishArticleReducer = (state, action) => {
  switch (action.type) {
    case "set_tags": {
      return { ...state, tagsError: null, tags: action.payload };
    }
    case "tags_error": {
      return { ...state, tagsError: action.payload };
    }
    case "set_description": {
      return { ...state, descriptionError: false, description: action.payload };
    }
    case "description_error": {
      return { ...state, descriptionError: true };
    }
    case "post_fetch_pending": {
      return { ...state, isDisabled: true };
    }
    case "post_fetch_succeed": {
      return { ...state, isDisabled: false };
    }
    case "post_fetch_failed": {
      return {
        ...state,
        isDisabled: false,
        fetchError: "Unable to publish article. Try again."
      };
    }
  }
  throw new Error("Invalid action.");
};

const initialState = {
  tags: [""],
  tagsError: null,
  description: "",
  descriptionError: false,
  isDisabled: false,
  fetchError: null
};

export default function usePublishArticle(setShow) {
  const { id } = useParams();
  const { dispatch: articleDispatch } = useArticleContext();
  const [state, dispatch] = useReducer(publishArticleReducer, initialState);

  const publishArticleHandler = () => {
    if (state.description.length < 100 && description.length > 400) {
      dispatch({ type: "description_error" });
      return;
    }

    if (state.tags.length < 1) {
      dispatch({ type: "tags_error", payload: "Use at least one tag." });
      return;
    }

    const publishedArticleDetails = {
      description: state.description,
      tags: state.tags
    };

    dispatch({ type: "post_fetch_pending" });
    fetch(`${publishArticle}${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(publishedArticleDetails)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(() => {
        setShow(false);
        articleDispatch({ type: "publish_article", payload: { ...publishedArticleDetails } });
        dispatch({ type: "post_fetch_succeed" });
      })
      .catch((err) => {
        dispatch({ type: "post_fetch_failed" });
        console.log(err);
      });
  };

  return {
    state,
    dispatch,
    publishArticleHandler
  };
}
