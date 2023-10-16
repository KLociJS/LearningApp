import { Input } from "Components";
import TextArea from "Components/Input/TextArea/TextArea";
import usePublishArticle from "./Hooks/usePublishArticle";

export default function PublishArticleModalContent({ setShow }) {
  const {
    state: { tags, description, tagsError, descriptionError, fetchError, isDisabled },
    dispatch,
    publishArticleHandler
  } = usePublishArticle(setShow);

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
      />
      <button className="primary-button" onClick={publishArticleHandler} disabled={isDisabled}>
        Publish
      </button>
      <button className="secondary-button" onClick={() => setShow(false)} disabled={isDisabled}>
        Cancel
      </button>
    </section>
  );
}
