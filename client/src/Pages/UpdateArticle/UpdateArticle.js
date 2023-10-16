import { MarkdownEditor, Modal, ModalTriggerElement } from "Components";
import MarkdownEditorSkeleton from "Components/MarkdownEditor/MarkdownEditorSkeleton/MarkdownEditorSkeleton";
import UpdateArticleModalContent from "./Components/UpdateArticleModalContent";
import useUpdateMarkdown from "./Hooks/useUpdateMarkdown";

export default function UpdateArticle() {
  const { state, markdown, setMarkdown } = useUpdateMarkdown();

  if (state.isLoading) return <MarkdownEditorSkeleton />;

  return (
    <div className="editor-page-container">
      <section className="controls">
        <Modal
          modalContent={
            <UpdateArticleModalContent markdown={markdown} title={state.article.title} />
          }
          triggerElement={<ModalTriggerElement className="secondary-button" text="Save" />}
        />
      </section>
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
    </div>
  );
}
