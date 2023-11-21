import "./TableOfContents.css";

export default function TableOfContents({ headings }) {
  return (
    <div className="table-of-contents-container">
      {headings.map((heading) => {
        const isHighlighted = heading.isVisible ? "highlighted" : "";

        return (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`table-of-contents-link ${isHighlighted}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id).scrollIntoView({
                behavior: "smooth"
              });
            }}>
            {convertId(heading.id)}
          </a>
        );
      })}
    </div>
  );
}

const convertId = (id) => {
  const idWithSpaces = id.replace(/-/g, " ");
  return idWithSpaces.slice(0, 1).toUpperCase() + idWithSpaces.slice(1, id.length);
};
