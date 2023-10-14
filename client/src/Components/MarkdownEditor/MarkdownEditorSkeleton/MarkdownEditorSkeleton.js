import "./MarkdownEditorSkeleton.css";

export default function MarkdownEditorSkeleton() {
  return (
    <div className="editor-page-container">
      <section className="controls">
        <div className="markdown-button-skeleton"></div>
      </section>
      <div className="markdown-editor-skeleton"></div>
    </div>
  );
}
