import "./TableOfContents.css";

export default function TableOfContents({ activeHeading, headings }) {
  const convertId = (id) => {
    const idWithSpaces = id.replace(/-/g, " ");
    return idWithSpaces.slice(0, 1).toUpperCase() + idWithSpaces.slice(1, id.length);
  };

  return (
    <div className="table-of-contents-container">
      {headings.map((id) => {
        const isHighlighted = id === activeHeading ? "highlighted" : "";

        return (
          <a
            key={id}
            href={`#${id}`}
            className={`table-of-contents-link ${isHighlighted}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id).scrollIntoView({
                behavior: "smooth"
              });
            }}>
            {convertId(id)}
          </a>
        );
      })}
    </div>
  );
}
