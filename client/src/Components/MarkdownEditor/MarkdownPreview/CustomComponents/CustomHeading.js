import { AiOutlineLink } from "react-icons/ai";

export default function CustomHeading({ children }) {
  const id = children ? children[0].toLowerCase().replace(/\s+/g, "-") : "";

  return (
    <h1 id={id} className="custom-heading">
      {children}
      <a href={`#${id}`} className="heading-anchor">
        <AiOutlineLink />
      </a>
    </h1>
  );
}
