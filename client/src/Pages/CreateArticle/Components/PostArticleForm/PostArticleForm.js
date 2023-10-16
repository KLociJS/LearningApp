import { Input } from "Components";
import usePostArticle from "./Hooks/usePostArticle";

export default function PostArticleForm({ markdown, setShow }) {
  const {
    state: { title, titleError, category, categoryError, subCategory, isDisabled, hasFetchError },
    dispatch,
    postArticle
  } = usePostArticle(markdown, setShow);

  const setTitle = (title) => {
    dispatch({ type: "set_title", payload: title });
  };
  const setCategory = (category) => {
    dispatch({ type: "set_category", payload: category });
  };
  const setSubCategory = (subCategory) => {
    dispatch({ type: "set_sub_category", payload: subCategory });
  };

  return (
    <section className="modal" onClick={(e) => e.stopPropagation()}>
      <h1 className="heading-1">Note details</h1>
      <Input
        label="Title"
        inputValue={title}
        setInputValue={setTitle}
        isDisabled={isDisabled}
        hasError={titleError}
      />
      <Input
        label="Category"
        inputValue={category}
        setInputValue={setCategory}
        isDisabled={isDisabled}
        hasError={categoryError}
      />
      <Input
        label="Subcategory"
        inputValue={subCategory}
        setInputValue={setSubCategory}
        isDisabled={isDisabled}
      />
      {hasFetchError ? (
        <p className="error-msg">{`Couldn't post article. Try again later`}</p>
      ) : null}
      <button className="primary-button" onClick={postArticle} disabled={isDisabled}>
        Save
      </button>
      <button onClick={() => setShow(false)} className="secondary-button" disabled={isDisabled}>
        Cancel
      </button>
    </section>
  );
}
