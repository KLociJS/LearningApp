import { AiOutlineLink } from "react-icons/ai";

export default function CustomHeading({ children }) {
  const id = children[0].toLowerCase().replace(/\s+/g, "-");

  return (
    <h1 id={children[0]} className="custom-heading">
      {children}
      <a href={`#${id}`} className="heading-anchor">
        <AiOutlineLink />
      </a>
    </h1>
  );
}
