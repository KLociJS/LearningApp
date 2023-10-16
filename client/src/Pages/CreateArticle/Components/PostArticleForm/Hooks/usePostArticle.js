import { postArticleUrl } from "_Constants/fetchUrl";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const postArticleReducer = (state, action) => {
  switch (action.type) {
    case "set_category": {
      return { ...state, categoryError: false, category: action.payload };
    }
    case "category_error": {
      return { ...state, categoryError: true };
    }
    case "set_sub_category": {
      return { ...state, subCategory: action.payload };
    }
    case "set_title": {
      return { ...state, titleError: false, title: action.payload };
    }
    case "title_error": {
      return { ...state, titleError: true };
    }
    case "post_article_fetch_pending": {
      return { ...state, isDisabled: true };
    }
    case "post_article_fetch_succeed": {
      return { ...state, isDisabled: false };
    }
    case "post_article_fetch_failed": {
      return { ...state, isDisabled: false, hasFetchError: true };
    }
  }
  throw new Error("Invalid action.");
};

const initialState = {
  category: "",
  categoryError: false,
  subCategory: "",
  title: "",
  titleError: false,
  isDisabled: false,
  hasFetchError: false
};

export default function usePostArticle(markdown, setShow) {
  const [state, dispatch] = useReducer(postArticleReducer, initialState);
  const navigate = useNavigate();

  const postArticle = () => {
    if (state.title.length < 2) {
      dispatch({ type: "title_error" });
      return;
    }

    if (state.category.length < 2) {
      dispatch({ type: "category_error" });
      return;
    }

    const article = {
      title: state.title,
      markdown,
      category: state.category,
      subcategory: state.subCategory === "" ? null : state.subCategory
    };

    console.log(article);

    dispatch({ type: "post_article_fetch_pending" });

    fetch(postArticleUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(article)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        dispatch({ type: "post_article_fetch_succeed" });
        setShow(false);
        navigate(`/article/${data.id}`);
        localStorage.removeItem("markdown");
      })
      .catch((err) => {
        dispatch({ type: "post_article_fetch_failed" });
        console.log(err);
      });
  };

  return {
    postArticle,
    state,
    dispatch
  };
}
