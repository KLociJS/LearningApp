import { useEffect, useState } from "react";

export default function useGetHeadingIds(isArticleLoading) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (isArticleLoading) return;
    const ids = Array.from(document.querySelectorAll(".custom-heading")).map((heading) => ({
      id: heading.id,
      isVisible: false
    }));
    setHeadings(ids);
  }, [isArticleLoading]);

  return { headings, setHeadings };
}
