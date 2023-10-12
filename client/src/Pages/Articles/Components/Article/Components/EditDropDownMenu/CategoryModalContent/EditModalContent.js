import { Input } from "Components";
import useUpdateCategory from "../Hooks/useUpdateCategory";

export default function EditModalContent({ setShow }) {
  const { category, setCategory, subCategory, setSubcategory, handleCategoryUpdate } =
    useUpdateCategory(setShow);

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
