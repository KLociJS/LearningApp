import { AiOutlineInfoCircle } from "react-icons/ai";

export default function InfoBlockquote({ children }) {
  return (
    <div className="info-quote-container">
      <div className="info-quote-icon-container">
        <AiOutlineInfoCircle className="info-icon" />
      </div>
      <div className="info-quote-text">{children}</div>
    </div>
  );
}
