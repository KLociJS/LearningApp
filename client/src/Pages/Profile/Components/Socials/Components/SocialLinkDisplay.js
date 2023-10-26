export default function SocialLinkDisplay({ link, name, placeholder }) {
  return (
    <>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      ) : (
        <p className="social-placeholder">{placeholder}</p>
      )}
    </>
  );
}
