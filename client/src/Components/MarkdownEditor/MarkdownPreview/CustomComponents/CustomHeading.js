import { useRef } from "react";
import { AiOutlineLink } from "react-icons/ai";
import useVisible from "./Hooks/useVisible";

export default function CustomHeading({ children, setHeadings }) {
  const id = children ? children[0].toLowerCase().replace(/\s+/g, "-") : "";

  const headingRef = useRef(null);
  useVisible(setHeadings, headingRef);

  return (
    <h2 ref={headingRef} id={id} className="custom-heading">
      {children}
      <a href={`#${id}`} className="heading-anchor">
        <AiOutlineLink />
      </a>
    </h2>
  );
}
