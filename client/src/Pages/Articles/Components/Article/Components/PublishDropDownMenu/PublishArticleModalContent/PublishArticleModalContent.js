import { Input } from "Components";
import TextArea from "Components/Input/TextArea/TextArea";
import usePublishArticle from "./Hooks/usePublishArticle";

export default function PublishArticleModalContent({ setShow }) {
  const { description, setDescription, tags, setTags, publishArticleHandler } =
    usePublishArticle(setShow);

  return (
    <section className="modal" onClick={(e) => e.stopPropagation()}>
      <h3 className="modal-header">Publish article</h3>
      <Input label="Tags" inputValue={tags} setInputValue={setTags} />
      <TextArea label="Description" inputValue={description} setInputValue={setDescription} />
      <button className="primary-button" onClick={publishArticleHandler}>
        Publish
      </button>
      <button className="secondary-button" onClick={() => setShow(false)}>
        Cancel
      </button>
    </section>
  );
}
