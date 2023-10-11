import { useRef, useState } from "react";

import MarkdownHelp from "./MarkdownHelp/MarkdownHelp";
import MarkdownPreview from "./MarkdownPreview/MarkdownPreview";
import MarkdownTextArea from "./TextInput/MarkdownTextArea";

import { AiOutlineLink } from "react-icons/ai";
import { BsBlockquoteLeft, BsCodeSlash, BsTypeBold, BsTypeItalic } from "react-icons/bs";
import { IoHelpOutline } from "react-icons/io5";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { PiImage } from "react-icons/pi";
import useScrollSynch from "./Hooks/useScrollSynch";

export default function MarkdownEditor({ markdown, setMarkdown }) {
  const [showHelp, setShowHelp] = useState(false);

  const textAreaRef = useRef(null);

  const markdownPreviewRef = useRef(null);

  useScrollSynch(textAreaRef, markdownPreviewRef);

  // Helpers
  const modifySelected = (ref, element) => {
    const textArea = ref.current;
    const textBeforeSelected = textArea.value.substring(0, textArea.selectionStart);
    const selectedText = textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
    const textAfterSelected = textArea.value.substring(textArea.selectionEnd);

    return `${textBeforeSelected}${element}${selectedText}${element}${textAfterSelected}`;
  };

  const insertAtCurseor = (ref, element) => {
    const textArea = ref.current;
    const { selectionStart, selectionEnd } = textArea;

    const textBeforeCursor = textArea.value.substring(0, selectionStart);
    const textAfterCursor = textArea.value.substring(selectionEnd, textArea.value.length);

    return `${textBeforeCursor}${element}${textAfterCursor}`;
  };

  const addLink = () => {
    const newText = insertAtCurseor(textAreaRef, "[title](https://www.example.com)");
    setMarkdown(newText);
  };

  const addImage = () => {
    const newText = insertAtCurseor(textAreaRef, "![alt text](image-link)");
    setMarkdown(newText);
  };

  const addQuote = () => {
    const newText = insertAtCurseor(textAreaRef, ">");
    setMarkdown(newText);
  };

  const addCodeBlock = () => {
    const newText = insertAtCurseor(textAreaRef, "``` lang \n \n ```");
    setMarkdown(newText);
  };

  const addH1 = () => {
    const newText = insertAtCurseor(textAreaRef, "# ");
    setMarkdown(newText);
  };

  const addH2 = () => {
    const newText = insertAtCurseor(textAreaRef, "## ");
    setMarkdown(newText);
  };

  const addH3 = () => {
    const newText = insertAtCurseor(textAreaRef, "### ");
    setMarkdown(newText);
  };

  const makeBold = () => {
    const result = modifySelected(textAreaRef, "**");
    setMarkdown(result);
  };

  const makeItealic = () => {
    const result = modifySelected(textAreaRef, "*");
    setMarkdown(result);
  };

  return (
    <div className="editor-container">
      <section className="markdown-tools">
        <BsTypeBold className="markdown-tool-icon" onClick={makeBold} />
        <BsTypeItalic className="markdown-tool-icon" onClick={makeItealic} />
        <div className="markdown-tool-separator"></div>
        <LuHeading1 className="markdown-tool-icon" onClick={addH1} />
        <LuHeading2 className="markdown-tool-icon" onClick={addH2} />
        <LuHeading3 className="markdown-tool-icon" onClick={addH3} />
        <div className="markdown-tool-separator"></div>
        <BsCodeSlash className="markdown-tool-icon" onClick={addCodeBlock} />
        <BsBlockquoteLeft className="markdown-tool-icon" onClick={addQuote} />
        <div className="markdown-tool-separator"></div>
        <AiOutlineLink className="markdown-tool-icon" onClick={addLink} />
        <PiImage className="markdown-tool-icon" onClick={addImage} />
        <IoHelpOutline
          className={`markdown-tool-icon last ${showHelp ? "active" : ""}`}
          onClick={() => setShowHelp((s) => !s)}
        />
      </section>
      <MarkdownTextArea markdown={markdown} setMarkdown={setMarkdown} textAreaRef={textAreaRef} />
      {showHelp ? (
        <MarkdownHelp />
      ) : (
        <MarkdownPreview markdown={markdown} markdownPreviewRef={markdownPreviewRef} />
      )}
    </div>
  );
}
