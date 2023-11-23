import { AiOutlineWarning } from "react-icons/ai";

export default function WarningBlockquote({ children }) {
  return (
    <div className="warning-quote-container">
      <div className="warning-quote-icon-container">
        <AiOutlineWarning className="warning-icon" />
      </div>
      <div className="warning-quote-text">{children}</div>
    </div>
  );
}
