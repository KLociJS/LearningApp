import useArticle from "Hooks/useArticle";
import useSidebarContent from "Pages/Articles/Hooks/useSidebarContent";
import { updateCategory } from "_Constants/fetchUrl";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function useUpdateCategory(setShow) {
  const { id } = useParams();
  const { setSidebarContent } = useSidebarContent();
  const { state, dispatch } = useArticle();
  const [category, setCategory] = useState(state.article.category);
  const [subCategory, setSubcategory] = useState(state.article.subCategory);

  const handleCategoryUpdate = () => {
    const categoryData = {
      category,
      subCategory: subCategory ? subCategory : null
    };

    fetch(`${updateCategory}${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(categoryData)
    })
      .then((res) => res.json())
      .then((res) => {
        setSidebarContent(res);
        dispatch({ type: "update_article_category", payload: { ...categoryData } });
        setShow(false);
      })
      .catch((err) => console.log(err));
  };
  return {
    category,
    setCategory,
    subCategory,
    setSubcategory,
    handleCategoryUpdate
  };
}
