import { Input } from "Components";
import TextArea from "Components/Input/TextArea/TextArea";
import useUpdatePublishedArticle from "./Hooks/useUpdatePublishedArticle";

export default function PublishUpdateModal({ setShow }) {
  const {
    tags,
    setTags,
    description,
    setDescription,
    updatePublishHandler,
    descriptionError,
    setDescriptionError,
    tagError,
    setTagError,
    isDisabled,
    error
  } = useUpdatePublishedArticle(setShow);

  return (
    <section className="modal" onClick={(e) => e.stopPropagation()}>
      <h3 className="modal-header">Publish article</h3>
      <Input
        label="Tags"
        inputValue={tags}
        setInputValue={setTags}
        isDisabled={isDisabled}
        hasError={tagError}
        setError={setTagError}
      />
      <TextArea
        label="Description"
        inputValue={description}
        setInputValue={setDescription}
        error={descriptionError}
        setError={setDescriptionError}
        isDisabled={isDisabled}
      />
      {error ? <p className="error-msg">{error}</p> : null}
      <button className="primary-button" disabled={isDisabled} onClick={updatePublishHandler}>
        Update
      </button>
      <button className="secondary-button" disabled={isDisabled} onClick={() => setShow(false)}>
        Cancel
      </button>
    </section>
  );
}
