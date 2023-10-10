import { Input } from "Components";
import useArticle from "Hooks/useArticle";
import useSidebarContent from "Pages/Articles/Hooks/useSidebarContent";
import { updateCategory } from "_Constants/fetchUrl";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditModalContent({ setShow }) {
  const { id } = useParams();
  const { setSidebarContent } = useSidebarContent();
  const { category: oldCategory, subCategory: oldSubCategory } = useArticle();
  const [category, setCategory] = useState(oldCategory);
  const [subCategory, setSubcategory] = useState(oldSubCategory);

  const handleCategoryUpdate = () => {
    const categoryData = {
      category: category ? category : null,
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
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal-header">Edit category</h2>
      <Input label="Category" inputValue={category} setInputValue={setCategory} />
      <Input label="Subcategory" inputValue={subCategory} setInputValue={setSubcategory} />
      <button className="primary-button" onClick={handleCategoryUpdate}>
        Update
      </button>
      <button className="secondary-button" onClick={() => setShow(false)}>
        Close
      </button>
    </div>
  );
}
