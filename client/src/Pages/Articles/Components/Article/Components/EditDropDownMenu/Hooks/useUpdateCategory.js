import useArticleContext from "Hooks/useArticle";
import useSidebarContent from "Pages/Articles/Hooks/useSidebarContent";
import { updateCategory } from "_Constants/fetchUrl";
import { useReducer } from "react";
import { useParams } from "react-router-dom";

const updateCategoryReducer = (state, action) => {
  switch (action.type) {
    case "set_category": {
      return { ...state, category: action.payload, categoryError: null };
    }
    case "set_category_error": {
      return { ...state, categoryError: "Category is required." };
    }
    case "set_subCategory": {
      return { ...state, subCategory: action.payload };
    }
    case "fetch_update_error": {
      return { ...state, fetchError: "Couldn't update category. Try again later" };
    }
    case "fetch_update_pending": {
      return { ...state, isDisabled: true };
    }
    case "fetch_update_succeed": {
      return { ...state, isDisabled: false };
    }
  }
  throw new Error("Invalid action.");
};

export default function useUpdateCategory(setShow) {
  const { id } = useParams();
  const { setSidebarContent } = useSidebarContent();
  const { state: articleState, dispatch: articleDispatch } = useArticleContext();

  const initialState = {
    category: articleState.article.category,
    categoryError: null,
    subCategory: articleState.article.subCategory,
    fetchError: null,
    isDisabled: false
  };

  const [state, dispatch] = useReducer(updateCategoryReducer, initialState);

  const handleCategoryUpdate = () => {
    if (state.category.length < 2) {
      dispatch({ type: "set_category_error" });
      return;
    }

    const categoryData = {
      category: state.category,
      subCategory: state.subCategory ? state.subCategory : null
    };

    dispatch({ type: "fetch_update_pending" });
    fetch(`${updateCategory}${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(categoryData)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((res) => {
        setSidebarContent(res);
        dispatch({ type: "fetch_update_succeed" });
        articleDispatch({ type: "update_article_category", payload: { ...categoryData } });
        setShow(false);
      })
      .catch((err) => {
        dispatch({ type: "fetch_update_error" });
        console.log(err);
      });
  };
  return {
    state,
    dispatch,
    handleCategoryUpdate
  };
}
