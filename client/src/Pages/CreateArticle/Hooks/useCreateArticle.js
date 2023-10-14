import { useEffect, useState } from "react";

export default function useCreateArticle() {
  const [markdown, setMarkdown] = useState();

  useEffect(() => {
    if (markdown !== undefined) {
      localStorage.setItem("markdown", markdown);
    }
  }, [markdown]);

  useEffect(() => {
    const savedMarkdown = localStorage.getItem("markdown");
    if (savedMarkdown) {
      setMarkdown(savedMarkdown);
    }
  }, []);

  return { markdown, setMarkdown };
}
