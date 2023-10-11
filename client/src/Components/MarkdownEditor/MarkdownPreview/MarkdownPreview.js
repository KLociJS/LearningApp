import "../Markdown.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";

export default function MarkdownPreview({ markdown, markdownPreviewRef }) {
  return (
    <div className="editor-preview" ref={markdownPreviewRef}>
      <ReactMarkdown
        children={markdown} // eslint-disable-line react/no-children-prop
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")} // eslint-disable-line react/no-children-prop
                style={dark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
          // h6({ children }) {
          //     return <Test children={children}/>
          // }
        }}
      />
    </div>
  );
}
