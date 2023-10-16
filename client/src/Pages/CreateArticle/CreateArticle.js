import "./CreateArticle.css";

import { MarkdownEditor, Modal } from "Components";
import ModalTriggerElement from "Components/Modal/ModalTriggerElement";
import PostArticleForm from "./Components/PostArticleForm/PostArticleForm";
import useCreateArticle from "./Hooks/useCreateArticle";

export default function CreateArticle() {
  const { markdown, setMarkdown } = useCreateArticle();

  return (
    <div className="editor-page-container">
      <section className="controls">
        <Modal
          modalContent={<PostArticleForm markdown={markdown} />}
          triggerElement={<ModalTriggerElement text="Save" className="secondary-button" />}
        />
      </section>
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
    </div>
  );
}
