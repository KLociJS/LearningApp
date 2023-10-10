import { Input } from "Components";
import usePostArticle from "./Hooks/usePostArticle";

export default function PostArticleForm({ markdown, setShow }) {
  const {
    postArticle,
    isDisabled,
    setTitle,
    setCategory,
    setSubcategory,
    category,
    subcategory,
    title,
    titleError,
    settitleError
  } = usePostArticle(markdown, setShow);

  return (
    <section className="modal" onClick={(e) => e.stopPropagation()}>
      <h1 className="heading-1">Note details</h1>
      <Input
        label="Title"
        inputValue={title}
        setInputValue={setTitle}
        isDisabled={isDisabled}
        hasError={titleError}
        setError={settitleError}
      />
      {titleError ? <p className="error-msg">{titleError}</p> : null}
      <Input
        label="Category"
        inputValue={category}
        setInputValue={setCategory}
        isDisabled={isDisabled}
      />
      <Input
        label="Subcategory"
        inputValue={subcategory}
        setInputValue={setSubcategory}
        isDisabled={isDisabled}
      />

      <button className="primary-button" onClick={postArticle} disabled={isDisabled}>
        Save
      </button>
      <button onClick={(e) => setShow(false)} className="secondary-button" disabled={isDisabled}>
        Cancel
      </button>
    </section>
  );
}
