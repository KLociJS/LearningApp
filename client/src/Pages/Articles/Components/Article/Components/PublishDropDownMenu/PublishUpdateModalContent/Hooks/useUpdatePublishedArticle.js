import useArticleContext from "Hooks/useArticle";
import { updatePublishedArticle } from "_Constants/fetchUrl";
import { useReducer } from "react";
import { useParams } from "react-router-dom";

const updatePublishedArticleReducer = (state, action) => {
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
    case "update_request_pending": {
      return { ...state, isDisabled: true };
    }
    case "update_request_succeed": {
      return { ...state, isDisabled: false };
    }
    case "update_request_failed": {
      return {
        ...state,
        isDisabled: false,
        fetchError: "Unable to update published article details. Try again."
      };
    }
  }
  throw new Error("Invalid action.");
};

export default function useUpdatePublishedArticle(setShow) {
  const { id } = useParams();
  const { state: articleState, dispatch: articleDispatch } = useArticleContext();

  const initialState = {
    tags: articleState.article.tags,
    tagsError: null,
    description: articleState.article.description,
    descriptionError: false,
    isDisabled: false,
    fetchError: null
  };

  const [state, dispatch] = useReducer(updatePublishedArticleReducer, initialState);

  const updatePublishHandler = () => {
    if (state.description.length < 100 && description.length > 400) {
      dispatch({ type: "description_error" });
      return;
    }

    if (state.tags.length < 1) {
      dispatch({ type: "tags_error", payload: "Use at least one tag." });
      return;
    }

    const updatedArticleDetails = {
      tags: state.tags,
      description: state.description
    };

    dispatch({ type: "update_request_pending" });
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
      .then(() => {
        setShow(false);
        dispatch({ type: "update_request_succeed" });
        articleDispatch({
          type: "update_published_article_details",
          payload: { ...updatedArticleDetails }
        });
      })
      .catch(() => {
        dispatch({ type: "update_request_failed" });
      });
  };

  return {
    state,
    dispatch,
    updatePublishHandler
  };
}
