import { Input } from "Components";
import useUpdateArticle from "../Hooks/useUpdateArticle";

export default function UpdateArticleModalContent({ markdown, title, setShow }) {
  const { updateArticle, newTitle, setNewTitle, isDisabled, titleError, setTitleError } =
    useUpdateArticle(title, markdown, setShow);

  return (
    <section className="modal" onClick={(e) => e.stopPropagation()}>
      <h1 className="heading-1">Update article</h1>
      <Input
        label="Title"
        inputValue={newTitle}
        setInputValue={setNewTitle}
        isDisabled={isDisabled}
        hasError={titleError}
        setError={setTitleError}
      />
      {titleError ? <p className="error-msg">{titleError}</p> : null}
      <button className="primary-button" onClick={updateArticle} disabled={isDisabled}>
        Save
      </button>
      <button onClick={() => setShow(false)} className="secondary-button" disabled={isDisabled}>
        Close
      </button>
    </section>
  );
}
