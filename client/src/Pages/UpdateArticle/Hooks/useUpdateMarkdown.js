import useArticleContext from "Hooks/useArticle";
import { useState } from "react";

export default function useUpdateMarkdown() {
  const { state } = useArticleContext();
  const [markdown, setMarkdown] = useState(state.article.markdown);
  return {
    markdown,
    setMarkdown,
    state
  };
}
