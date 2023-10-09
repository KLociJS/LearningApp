import { MarkdownEditor, Modal, ModalTriggerElement } from "Components";
import { useGetArticle } from "Hooks";
import UpdateArticleModalContent from "./Components/UpdateArticleModal/UpdateArticleModalContent";

export default function UpdateArticle() {
  const { markdown, setMarkdown, title, isLoading } = useGetArticle();

  if (isLoading) return null;

  return (
    <div className='editor-page-container'>
      <section className='controls'>
        <Modal
          modalContent={
            <UpdateArticleModalContent markdown={markdown} title={title} />
          }
          triggerElement={
            <ModalTriggerElement className='secondary-button' text='Save' />
          }
        />
      </section>
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
    </div>
  );
}