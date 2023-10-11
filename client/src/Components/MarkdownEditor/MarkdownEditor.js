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
import {
  addCodeBlock,
  addH1,
  addH2,
  addH3,
  addImage,
  addLink,
  addQuote,
  makeBold,
  makeItalic
} from "./Utility/EditorUtility";

export default function MarkdownEditor({ markdown, setMarkdown }) {
  const [showHelp, setShowHelp] = useState(false);

  const textAreaRef = useRef(null);

  const markdownPreviewRef = useRef(null);

  useScrollSynch(textAreaRef, markdownPreviewRef);

  return (
    <div className="editor-container">
      <section className="markdown-tools">
        <BsTypeBold
          className="markdown-tool-icon"
          onClick={() => makeBold(textAreaRef, setMarkdown)}
        />
        <BsTypeItalic
          className="markdown-tool-icon"
          onClick={() => makeItalic(textAreaRef, setMarkdown)}
        />
        <div className="markdown-tool-separator"></div>
        <LuHeading1
          className="markdown-tool-icon"
          onClick={() => addH1(textAreaRef, setMarkdown)}
        />
        <LuHeading2
          className="markdown-tool-icon"
          onClick={() => addH2(textAreaRef, setMarkdown)}
        />
        <LuHeading3
          className="markdown-tool-icon"
          onClick={() => addH3(textAreaRef, setMarkdown)}
        />
        <div className="markdown-tool-separator"></div>
        <BsCodeSlash
          className="markdown-tool-icon"
          onClick={() => addCodeBlock(textAreaRef, setMarkdown)}
        />
        <BsBlockquoteLeft
          className="markdown-tool-icon"
          onClick={() => addQuote(textAreaRef, setMarkdown)}
        />
        <div className="markdown-tool-separator"></div>
        <AiOutlineLink
          className="markdown-tool-icon"
          onClick={() => addLink(textAreaRef, setMarkdown)}
        />
        <PiImage
          className="markdown-tool-icon"
          onClick={() => addImage(textAreaRef, setMarkdown)}
        />
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
