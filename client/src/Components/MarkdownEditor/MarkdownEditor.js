import { useRef, useState } from "react";

import useScrollSynch from "./Hooks/useScrollSynch";
import MarkdownHelp from "./MarkdownHelp/MarkdownHelp";
import MarkdownPreview from "./MarkdownPreview/MarkdownPreview";
import MarkdownTextArea from "./TextInput/MarkdownTextArea";

import { AiOutlineLink } from "react-icons/ai";
import { BsBlockquoteLeft, BsCodeSlash, BsTypeBold, BsTypeItalic } from "react-icons/bs";
import { IoHelpOutline } from "react-icons/io5";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { PiImage } from "react-icons/pi";

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
  const [show, setShow] = useState(true);

  const textAreaRef = useRef(null);
  const markdownPreviewRef = useRef(null);
  useScrollSynch(textAreaRef, markdownPreviewRef);

  return (
    <div className="editor-container">
      <section className="markdown-tools">
        <button onClick={() => makeBold(textAreaRef, setMarkdown)}>
          <BsTypeBold className="markdown-tool-icon" />
        </button>
        <button onClick={() => makeItalic(textAreaRef, setMarkdown)}>
          <BsTypeItalic className="markdown-tool-icon" />
        </button>
        <div className="markdown-tool-separator"></div>
        <button onClick={() => addH1(textAreaRef, setMarkdown)}>
          <LuHeading1 className="markdown-tool-icon" />
        </button>
        <button onClick={() => addH2(textAreaRef, setMarkdown)}>
          <LuHeading2 className="markdown-tool-icon" />
        </button>
        <button onClick={() => addH3(textAreaRef, setMarkdown)}>
          <LuHeading3 className="markdown-tool-icon" />
        </button>
        <div className="markdown-tool-separator"></div>
        <button onClick={() => addCodeBlock(textAreaRef, setMarkdown)}>
          <BsCodeSlash className="markdown-tool-icon" />
        </button>
        <button onClick={() => addQuote(textAreaRef, setMarkdown)}>
          <BsBlockquoteLeft className="markdown-tool-icon" />
        </button>
        <div className="markdown-tool-separator"></div>
        <button onClick={() => addLink(textAreaRef, setMarkdown)}>
          <AiOutlineLink className="markdown-tool-icon" />
        </button>
        <button onClick={() => addImage(textAreaRef, setMarkdown)}>
          <PiImage className="markdown-tool-icon" />
        </button>
        <button onClick={() => setShowHelp((s) => !s)} className="last">
          <IoHelpOutline className={`markdown-tool-icon ${showHelp ? "active" : ""}`} />
        </button>
        <button className="markdown-tool-button" onClick={() => setShow((prev) => !prev)}>
          {show ? "Preview" : "Hide Preview"}
        </button>
      </section>
      <MarkdownTextArea
        markdown={markdown}
        setMarkdown={setMarkdown}
        textAreaRef={textAreaRef}
        show={show}
      />
      {showHelp ? (
        <MarkdownHelp show={show} />
      ) : (
        <MarkdownPreview markdown={markdown} markdownPreviewRef={markdownPreviewRef} show={show} />
      )}
    </div>
  );
}
