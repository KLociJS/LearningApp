import { useArticle } from "Hooks";
import { useState } from "react";

export default function useUpdateMarkdown() {
  const { state } = useArticle();
  const [markdown, setMarkdown] = useState(state.article.markdown);
  return {
    markdown,
    setMarkdown,
    state
  };
}
