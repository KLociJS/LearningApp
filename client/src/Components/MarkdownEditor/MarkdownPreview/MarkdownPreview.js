import "../Markdown.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";
import CustomHeading from "./CustomComponents/CustomHeading";
import InfoBlockquote from "./CustomComponents/InfoBlockQuote";
import WarningBlockquote from "./CustomComponents/WarningBlockQuote";

export default function MarkdownPreview({ markdown, markdownPreviewRef, show }) {
  return (
    <div className={`editor-preview ${show ? "hidden" : ""}`} ref={markdownPreviewRef}>
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
          },
          h2({ children }) {
            return <CustomHeading>{children}</CustomHeading>; // eslint-disable-line react/no-children-prop
          },
          blockquote: ({ children }) => {
            const child = children[1];
            const value = child?.props?.children?.[0] || "";
            if (value.startsWith("[info]")) {
              return <InfoBlockquote>{value.replace("[info]", "").trim()}</InfoBlockquote>;
            } else if (value.startsWith("[warning]")) {
              return <WarningBlockquote>{value.replace("[warning]", "").trim()}</WarningBlockquote>;
            } else {
              return <blockquote>{children}</blockquote>;
            }
          }
        }}
      />
    </div>
  );
}
