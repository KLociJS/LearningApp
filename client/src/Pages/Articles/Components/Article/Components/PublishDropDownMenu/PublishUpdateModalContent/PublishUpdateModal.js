import { Input } from "Components";
import TextArea from "Components/Input/TextArea/TextArea";
import useUpdatePublishedArticle from "./Hooks/useUpdatePublishedArticle";

export default function PublishUpdateModal({ setShow }) {
  const {
    state: { tags, tagsError, isDisabled, description, descriptionError, fetchError },
    dispatch,
    updatePublishHandler
  } = useUpdatePublishedArticle(setShow);

  const setTags = (tags) => {
    const tagArr = tags.split(",");
    dispatch({ type: "set_tags", payload: tagArr });
  };
  const getTags = (tags) => {
    return tags.join(",");
  };
  const setDescription = (description) => {
    dispatch({ type: "set_description", payload: description });
  };

  return (
    <section className="modal" onClick={(e) => e.stopPropagation()}>
      <h3 className="modal-header">Publish article</h3>
      <Input
        label="Tags"
        inputValue={getTags(tags)}
        setInputValue={setTags}
        isDisabled={isDisabled}
        hasError={tagsError}
      />
      <TextArea
        label="Description"
        inputValue={description}
        setInputValue={setDescription}
        error={descriptionError}
        isDisabled={isDisabled}
        min={100}
        max={400}
      />
      {fetchError ? <p className="error-msg">{fetchError}</p> : null}
      <button className="primary-button" disabled={isDisabled} onClick={updatePublishHandler}>
        Update
      </button>
      <button className="secondary-button" disabled={isDisabled} onClick={() => setShow(false)}>
        Cancel
      </button>
    </section>
  );
}
