import { useEffect } from "react";

export default function useScrollSynch(textAreaRef, markdownPreviewRef) {
  const handleTextAreaScroll = () => {
    if (markdownPreviewRef.current && textAreaRef.current) {
      const percentageScrolled =
        (textAreaRef.current.scrollTop /
          (textAreaRef.current.scrollHeight - textAreaRef.current.clientHeight)) *
        100;
      const targetScrollTop =
        ((markdownPreviewRef.current.scrollHeight - markdownPreviewRef.current.clientHeight) /
          100) *
        percentageScrolled;
      markdownPreviewRef.current.scrollTop = targetScrollTop;
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.addEventListener("scroll", handleTextAreaScroll);
    }
    return () => {
      if (textAreaRef.current) {
        textAreaRef.current.removeEventListener("scroll", handleTextAreaScroll);
      }
    };
  }, []);
}
