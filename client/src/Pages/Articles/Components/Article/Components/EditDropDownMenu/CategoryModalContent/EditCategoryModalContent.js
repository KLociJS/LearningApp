import { Input } from "Components";
import useUpdateCategory from "../Hooks/useUpdateCategory";

export default function EditCategoryModalContent({ setShow }) {
  const {
    state: { category, categoryError, subCategory, fetchError, isDisabled },
    dispatch,
    handleCategoryUpdate
  } = useUpdateCategory(setShow);

  const setCategory = (category) => {
    dispatch({ type: "set_category", payload: category });
  };

  const setSubCategory = (subCategory) => {
    dispatch({ type: "set_subCategory", payload: subCategory });
  };

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal-header">Edit category</h2>
      <Input
        label="Category"
        inputValue={category}
        setInputValue={setCategory}
        hasError={categoryError}
        isDisabled={isDisabled}
      />
      <Input
        label="Subcategory"
        inputValue={subCategory}
        setInputValue={setSubCategory}
        isDisabled={isDisabled}
      />
      {fetchError ? <p className="error-msg">{fetchError}</p> : null}
      <button className="primary-button" onClick={handleCategoryUpdate}>
        Update
      </button>
      <button className="secondary-button" onClick={() => setShow(false)}>
        Close
      </button>
    </div>
  );
}
