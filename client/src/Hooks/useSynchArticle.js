import { getArticleById } from "_Constants/fetchUrl";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

const initialState = {
  article: null,
  isLoading: true
};

const articleReducer = (state, action) => {
  switch (action.type) {
    case "fetch_article_request": {
      return { ...state, isLoading: true };
    }
    case "fetch_article_success": {
      return { ...state, isLoading: false, article: action.payload };
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
    case "update_article_category": {
      return { ...state, article: { ...state.article, ...action.payload } };
    }
    case "update_markdown": {
      return { ...state, article: { ...state.article, markdown: action.payload } };
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(({ data }) => {
        dispatch({ type: "fetch_article_success", payload: data });
      })
      .catch((err) => console.log(err));
  }, [id]);

  return { state, dispatch };
}
