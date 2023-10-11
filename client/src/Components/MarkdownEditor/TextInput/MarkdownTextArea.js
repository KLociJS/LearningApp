import "../Markdown.css";

export default function MarkdownTextArea({ setMarkdown, markdown, textAreaRef, show }) {
  return (
    <textarea
      onChange={(e) => setMarkdown(e.currentTarget.value)}
      value={markdown}
      ref={textAreaRef}
      className={show ? "" : "hidden"}></textarea>
  );
}
