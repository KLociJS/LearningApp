import { getArticleById } from "_Constants/fetchUrl";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

const initialState = {
  article: null,
  isLoading: true,
  error: null
};

const articleReducer = (state, action) => {
  switch (action.type) {
    case "fetch_article_request": {
      return { ...state, isLoading: true };
    }
    case "fetch_article_success": {
      return { ...state, isLoading: false, article: action.payload };
    }
    case "fetch_article_fail": {
      return { ...state, isLoading: false, error: "Error. Try again later." };
    }
    case "publish_article": {
      return { ...state, article: { ...state.article, isPublished: true, ...action.payload } };
    }
    case "unpublish_article": {
      return { ...state, article: { ...state.article, isPublished: false } };
    }
    case "update_published_article_details": {
      return { ...state, article: { ...state.article, ...action.payload } };
    }
  }
  throw Error("Unknown action: " + action.type);
};

export default function useSynchArticle() {
  const [state, dispatch] = useReducer(articleReducer, initialState);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "fetch_article_request" });
    fetch(`${getArticleById}${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then(({ data }) => {
        dispatch({ type: "fetch_article_success", payload: data });
      })
      .catch((err) => dispatch({ type: "fetch_article_fail" }));
  }, [id]);

  return { state, dispatch };
}
