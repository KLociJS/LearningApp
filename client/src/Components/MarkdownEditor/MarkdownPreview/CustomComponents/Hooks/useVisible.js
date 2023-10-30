import { useEffect } from "react";

export default function useVisible(setHeadings, ref) {
  useEffect(() => {
    const checkVisibility = () => {
      if (!ref.current) return;

      const elementRect = ref.current.getBoundingClientRect();
      const parentRect = document.querySelector(".article-container").getBoundingClientRect();

      const top30Percent = parentRect.top + 0.3 * parentRect.height;

      const isInView = elementRect.top >= parentRect.top && elementRect.top <= top30Percent;

      if (isInView) {
        const id = ref.current.id;
        setHeadings((prev) => {
          return prev.map((heading) => ({ id: heading.id, isVisible: heading.id === id }));
        });
      }
    };

    const debouncedCheckVisibility = debounce(checkVisibility, 200);

    const parentElement = document.querySelector(".article-container");
    parentElement.addEventListener("scroll", debouncedCheckVisibility);
    parentElement.addEventListener("resize", debouncedCheckVisibility);
    debouncedCheckVisibility();

    return () => {
      parentElement.removeEventListener("scroll", debouncedCheckVisibility);
      parentElement.removeEventListener("resize", debouncedCheckVisibility);
    };
  }, [ref]);
}

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
